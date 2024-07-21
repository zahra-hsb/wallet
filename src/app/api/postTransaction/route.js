import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        const data = await req.json()
        await dbConnect()

        const transaction = new TransactionModel({ trackId: data.trackId })
        const response = await transaction.save()

        return NextResponse.json({ response })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}