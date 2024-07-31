import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        console.log(address);
        if (!address) {
            console.log('address does not exists!!!');
        }
        await dbConnect()
        const foundUser = await UsersModel.findOne({ address: address })
        console.log(foundUser);
        if (foundUser === null) {
            return NextResponse.json({ foundUser, isExist: false })
        } else {
            return NextResponse.json({ foundUser, isExist: true })
        }
    } catch (error) {
        return NextResponse.json({ error, isExist: false })
    }
} 