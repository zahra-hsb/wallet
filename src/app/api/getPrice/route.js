import dbConnect from "@/lib/dbConnect"
import UsersModel from "@/lib/models/UsersModel"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"





export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        await dbConnect()

        const price = await UsersModel.findOne({ address }).select('price')
        revalidatePath('/referral', 'page')
        return NextResponse.json({ price })
    } catch (error) {
        return NextResponse.json({ error })
    }
}