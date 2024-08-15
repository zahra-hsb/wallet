import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {

    const data = await req.json();
    console.log(data.upAddress.address);
    const address = data.data[0].address;
    const level = data.data[0].level;
    const upAddress = data.upAddress.address;
    const referral = data.referralCode
    console.log(referral);
    await dbConnect();
    if (upAddress === null) {
      console.log('upAddress does not exists!!');
    }
    const lineData = await UsersModel.findOne(  
      { 'referralCode.refCode': referral }, 
      { 'referralCode.$': 1 }   
    );
    const line = lineData.referralCode[0].line
    const existingFriend = await UsersModel.find({ friends: { address, level: '1' } });
    const existingUser = await UsersModel.find({ address: address }, {})

    if (existingFriend.length === 0 && existingUser.length === 0) {
      // 3 lvl 1 0x22
      const updatedDoc = await UsersModel.findOneAndUpdate(
        { address: upAddress },
        { $push: { friends: { address, level: '1', line } } }
      );

      if (!updatedDoc) {
        throw new Error('Document update failed.');
      }
      // 0x22
      console.log('updatedDoc: ', updatedDoc);
      // 2 lvl 2 0x59 !!!! 0x22
      let user = await UsersModel.findOneAndUpdate(
        { 'friends': { 'address': updatedDoc.address, 'level': '1' } },
        { $push: { friends: { address: address, level: '2', line } } }
      )


      console.log('found user: ', user); // 0x59

      if (user) {
        console.log('found user: ', user);

        // 1 lvl 3
        let user2 = await UsersModel.findOneAndUpdate(
          { 'friends': { 'address': user.address, 'level': '1' } },
          { $push: { friends: { address: address, level: '3' } } },
          { upsert: false, new: true }
        )

        console.log(user.address);

        console.log('user2: ', user2);
      }

      if (!updatedDoc) {
        throw new Error('Document update failed.');
      }
      revalidatePath('/referral', 'page')

      return NextResponse.json({ updatedDoc });

    } else {
      console.log('the friend exists in database');
      return NextResponse.json({ message: 'Friend already exists in database' });

    }
  } catch (err) {
    console.error('Error updating document:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}