import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        const address = req.nextUrl.searchParams.get("address");
        if (!address) {
            return NextResponse.json({ error: "Address parameter is missing" });
        }

        await dbConnect()

        const user = await UsersModel.findOne({ 'address': address })
        revalidatePath('/guide', 'page')

        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}