import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function PUT(req) {
    try {
        const { address, price, prevPrice } = await req.json()
        let Price = Number(prevPrice)
        let newPrice = Number(price)
        Price += newPrice
        if (!address || !price) {
            throw new Error('Missing required fields: address and price');
        }

        await dbConnect()
        // await init();
        console.log('address: ', address);
        const updatedDoc = await UsersModel.updateOne({ address: address }, { $set: { price: Price } })
        if (!updatedDoc.modifiedCount) {
            throw new Error('Document not found or not updated');
        }
        return NextResponse.json({ message: 'updated successfully' });
    } catch (err) {
        console.error('Error updating document:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
