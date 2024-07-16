import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function PUT(req) {
    try {
        const { address, resultRef } = await req.json()
        // console.log('object', resultRef);
        if (!address || !resultRef) {
            throw new Error('Missing required fields: address and price');
        }

        await dbConnect()

        // const foundRef = await UsersModel.find({ referralCode: resultRef }, {})
        // console.log('found ref: ', foundRef);

        const updatedDoc = await UsersModel.updateOne({ address: address }, { $set: { referralCode: resultRef } })
        if (!updatedDoc.modifiedCount) {
            throw new Error('Document not found or not updated');
        }
        return NextResponse.json({ message: 'updated successfully' });
    } catch (err) {
        console.error('Error updating document:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
