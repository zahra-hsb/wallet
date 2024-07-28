import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";


let client
let db


export async function GET() {
    try {
        await dbConnect()
        const users = await UsersModel.find({})
        revalidatePath('/all', 'page')
        revalidatePath('/withdraw', 'page')

        return NextResponse.json(users);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}