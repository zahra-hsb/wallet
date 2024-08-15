import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        const date = req.nextUrl.searchParams.get("date");
        const transactionType = req.nextUrl.searchParams.get("transactionType");
        await dbConnect()
        const transactions = await TransactionModel.find({ date, transactionType })

        return NextResponse.json({ transactions })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}