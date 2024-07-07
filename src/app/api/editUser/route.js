import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function PUT(req) {
    try {
        const value = await req.json()
        console.log('value: ', value.price);
        await dbConnect()
        // await init();
        const updatedUser = await UsersModel.updateOne({ address: value.address }, { $set: { price: value.price } });
        console.log(updatedUser);
        return NextResponse.json(updatedUser);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
