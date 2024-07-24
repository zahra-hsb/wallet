import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {

    const data = await req.json();

    const address = data.data[0].address;
    const level = data.data[0].level;
    const link = data.data[0].foundRef;
    await dbConnect();
    if (link === null) {
      console.log('referral code does not exists!!');
    }

    const existingFriend = await UsersModel.find({ friends: { address, level } });
    const existingUser = await UsersModel.find({ address: address }, {})

    if (existingFriend.length === 0 && existingUser.length === 0) {
      // 3
      const updatedDoc = await UsersModel.findOneAndUpdate(
        { referralCode: data.link },
        { $push: { friends: { address, level } } },
        { upsert: true, new: true }
      );

      if (!updatedDoc) {
        throw new Error('Document update failed.');
      }

      console.log('updatedDoc: ', updatedDoc);
      // 2
      let user = await UsersModel.find({ 'friends.address': updatedDoc.address })
      // let user = await UsersModel.findOneAndUpdate({ 'friends.address': updatedDoc.address }, { $set: { 'friends.level': '1' } })

      console.log('found user: ', user);

      if (user) {
        // 1
        const user2 = await UsersModel.findOneAndUpdate({ 'friends.address': user.address }, { $push: { 'friends.address': updatedDoc.address, 'friends.level': '2' } }, { upsert: true, new: true })
        console.log('user2: ', user2);
        // 0
        if (user2) {
          const user3 = await UsersModel.findOneAndUpdate({ 'friends.address': user2.address }, { $push: { 'friends.address': user.address, 'friends.level': '2' } }, { upsert: true, new: true });
          await UsersModel.findOneAndUpdate({ 'friends.address': user2.address }, { $push: { 'friends.address': updatedDoc.address, 'friends.level': '3' } }, { upsert: true, new: true });
          console.log('user3: ', user3);
        }
      }

      if (!updatedDoc) {
        throw new Error('Document update failed.');
      }
      revalidatePath('/referral', 'page')

      return NextResponse.json({ updatedDoc });

    } else {
      console.log('the friend exists in the database');
      return NextResponse.json({ message: 'Friend already exists in database' });

    }
  } catch (err) {
    console.error('Error updating document:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}