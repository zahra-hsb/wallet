import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // const { link, address, invest, level } = await req.json();
    const data = await req.json();
    console.log('data: ', data[0]);
    const address = data.data[0].address;
    const level = data.data[0].level;
    // const investAmount = 0
    // **Validate required fields:**
    // if (!address || !level) {
    //   throw new Error('Missing required fields: address and level');
    // }

    // **Establish database connection:**
    await dbConnect();

    // **Log for debugging:**
    // console.log('address:', data);

    const existingFriend = await UsersModel.find({ friends: { address, level } });
    const existingUser = await UsersModel.find({ address: address }, {})
    
    if (existingFriend.length === 0 && existingUser.length === 0) {
      // **Update document using `findOneAndUpdate` for upsert:**
      const updatedDoc = await UsersModel.findOneAndUpdate(
        { referralCode: data.link },
        { $push: { friends: { address, level } } },
        { upsert: true, new: true }
      );
      if (!updatedDoc) {
        throw new Error('Document update failed.'); // More specific error message
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