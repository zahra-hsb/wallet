import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // const { link, address, invest, level } = await req.json();
    const data = await req.json()
    const investAmount = Number(data.data[0].amountOfInvest);
    // const investAmount = 0

    // **Validate required fields:**
    // if (!data.data || !data.resultRef) {
    //   throw new Error('Missing required fields: data and result referral');
    // }

    // **Establish database connection:**
    await dbConnect();

    // **Log for debugging:**
    // console.log('address:', data);

    const isExistFriend = await UsersModel.find({ friends: [{ address: data.address }]}, {})

    console.log('isExistFriend: ', isExistFriend);

    // **Update document using `findOneAndUpdate` for upsert:**
    const updatedDoc = await UsersModel.findOneAndUpdate(
      { referralCode: data.link },
      {
        $push: {
          friends:
            [{
              address: data.data[0].address,
              amountOfInvest: investAmount,
              level: data.data[0].level,
              refCodeOfFriend: ''
            }]
        }
      },
      { upsert: true, new: true } // Upsert if not found, return updated document
    );

    if (!updatedDoc) {
      throw new Error('Document update failed.'); // More specific error message
    }

    return NextResponse.json({ message: 'Document updated successfully!' });
  } catch (err) {
    console.error('Error updating document:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}