import dbConnect from "@/lib/dbConnect"
import UsersModel from "@/lib/models/UsersModel"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"





export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        await dbConnect()

        const price = await UsersModel.findOne({ address }).select('price')
        const investmentValue = await UsersModel.findOne({ address }).select('investmentValue')
        const dailyProfit = await UsersModel.findOne({ address }).select('dailyProfit')
        revalidatePath('/referral', 'page')
        revalidatePath('/withdraw', 'page')
        revalidatePath('/wallet', 'page')
        return NextResponse.json({ price, investmentValue, dailyProfit })
    } catch (error) {
        return NextResponse.json({ error })
    }
}