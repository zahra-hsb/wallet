import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {

    const { data, upAddress, referralCode } = await req.json();
    console.log(data, upAddress, referralCode);

    await dbConnect();
    if (upAddress === null) {
      console.log('upAddress does not exists!!');
    }
    const lineData = await UsersModel.findOne(
      { 'referralCode.refCode': referralCode },
      { 'referralCode.$': 1 }
    );
    const line = lineData.referralCode[0].line
    const existingFriend = await UsersModel.find({ friends: { address: data[0].address, level: '1' } });
    const existingUser = await UsersModel.find({ address: data[0].address }, {})

    if (existingFriend.length === 0 && existingUser.length === 0) {
      // 3 lvl 1 0x22
      const updatedDoc = await UsersModel.findOneAndUpdate(
        { address: upAddress.address },
        { $push: { friends: { address: data[0].address, level: '1', line, refCode: referralCode } } }
      );

      if (!updatedDoc) {
        throw new Error('Document update failed.');
      }
      // 0x22
      console.log('updatedDoc: ', updatedDoc.address);
      // 2 lvl 2 0x59 !!!! 0x22

      let user = await UsersModel.findOneAndUpdate(
        { 'friends': { '$elemMatch': { 'address': updatedDoc.address, 'level': '1' } } },
        { $push: { friends: { address: data[0].address, level: '2', line, refCode: referralCode } } }
      )


      console.log('found user2: ', user); // 0x59

      if (user) {
        console.log('found user3: ', user);

        // 1 lvl 3
        let user2 = await UsersModel.findOneAndUpdate(
          { 'friends': { '$elemMatch': { 'address': user.address, 'level': '1' } } },
          { $push: { friends: { address: data[0].address, level: '3', line, refCode: referralCode } } }
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