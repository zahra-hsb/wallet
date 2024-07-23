import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {

    const data = await req.json();

    const address = data.data[0].address;
    const level = data.data[0].level;
   
    await dbConnect();


    const existingFriend = await UsersModel.find({ friends: { address, level } });
    const existingUser = await UsersModel.find({ address: address }, {})
    
    if (existingFriend.length === 0 && existingUser.length === 0) {
      
      const updatedDoc = await UsersModel.findOneAndUpdate(
        { referralCode: data.link },
        { $push: { friends: { address, level } } },
        { upsert: true, new: true }
      );

      console.log('updatedDoc: ', updatedDoc);
      
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