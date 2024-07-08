import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function PUT(req) {
    try {
        const { address, price } = await req.json()
        await dbConnect()
        // await init();
        console.log('address: ', address);
        await UsersModel.updateOne({ address: address }, { $set: { price: Number(price) } })
        
        return NextResponse.json({ message: 'updated successfully' });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
