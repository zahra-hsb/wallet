import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import { NextResponse } from "next/server";




export async function GET() {
    try {
        await dbConnect()
        const transactions = await TransactionModel.find({})

        return NextResponse.json({ transactions })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}