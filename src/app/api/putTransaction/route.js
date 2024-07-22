import dbConnect from "@/lib/dbConnect"
import TransactionModel from "@/lib/models/TransactionsModel"
import { NextResponse } from "next/server"


export async function PUT(req) {
    try {
        const { trackId, status } = await req.json()
        await dbConnect()
        const updatedStatus = await TransactionModel.updateOne({
            trackId: trackId
        }, {
            $set: {
                status: status
            }
        })
        return NextResponse.json({ updatedStatus })
    } catch (error) {
        console.log('update status failed: ', error);
        return NextResponse.json({ error })
    }



}