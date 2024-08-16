import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        const date = req.nextUrl.searchParams.get("date");
        const address = req.nextUrl.searchParams.get("address");
        const transactionType = req.nextUrl.searchParams.get("transactionType");

        console.log('object', transactionType);
        await dbConnect()

        const transactions = await TransactionModel.find({ date, transactionType })
        const userTransactions = await TransactionModel.find({ date, address })

        revalidatePath('/dashboard', 'page')
        return NextResponse.json({ transactions, userTransactions })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}