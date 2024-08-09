import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function PUT(req) {
    try {
        let { address, resultRef, line } = await req.json()
        console.log('object', address);
        if (!address || !resultRef) {
            throw new Error('Missing required fields: address and price');
        }

        await dbConnect()

        const foundRef = await UsersModel.findOne({ address: address }, {}).select('referralCode')
        console.log('found ref: ', foundRef.referralCode.length);

        const updatedDoc = await UsersModel.findOneAndUpdate({ address: address }, { $push: { referralCode: { refCode: resultRef, line: foundRef.referralCode.length + 1 } } })
        // if (!updatedDoc.modifiedCount) {
        //     throw new Error('Document not found or not updated');
        // }
        return NextResponse.json({ message: 'updated successfully' });
    } catch (err) {
        console.error('Error updating document:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
