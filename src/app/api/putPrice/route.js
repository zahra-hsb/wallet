import dbConnect from "@/lib/dbConnect"
import UsersModel from "@/lib/models/UsersModel"
import { NextResponse } from "next/server"



export async function PUT(req) {
    try {
        const { address, amount } = req.json()
        await dbConnect()

        const updatedUser = UsersModel.findOneAndUpdate({ address }, { $inc: { price: -amount }, $inc: { investmentValue: -amount } })
        return NextResponse.json({ message: 'successful decrement from price', updatedUser })
    } catch (error) {
        return NextResponse.json({ error })
    }
}