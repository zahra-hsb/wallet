import dbConnect from "@/lib/dbConnect"
import LineModel from "@/lib/models/LinesModel"
import TransactionModel from "@/lib/models/TransactionsModel"
import UsersModel from "@/lib/models/UsersModel"
import { NextResponse } from "next/server"


export async function PUT(req) {
    try {
        const { address } = await req.json()
        // console.log(address);
        await dbConnect()
        const referrals = await UsersModel.findOne({ address }).select('referralCode')
        const friends = await UsersModel.findOne({ address }).select('friends')
        const referralsLength = referrals.referralCode.length
        let total = 0;
        let bonus = 0;
        const friendsArray = friends.friends
        let totalInvests = [];
        // console.log(friendsArray);
        for (let i = 1; i < referralsLength; i++) {
            friendsArray.map(async item => {
                if (item.line == i) {
                    const investmentValue = await UsersModel.findOne({ address: item.address })
                    // total += investmentValue.investmentValue
                    totalInvests.push({ address: address, total: total, line: item.line })
                    // const theLine = await LineModel.findOne({ address: item.address }, {})
                    // if (theLine == null) {
                    //     const newLine = new LineModel({ address: item.address, total: total, line: item.line })
                    //     const response = await newLine.save()
                    //     console.log(response);
                    // }
                }
                total = 0
                totalInvests.map(item => {
                    if (item.total === 10000) {
                        bonus = 200
                    } else if (item.total === 20000) {
                        bonus = 500
                    } else if (item.total === 50000) {
                        bonus = 1500
                    } else if (item.total === 100000) {
                        bonus = 3000
                    } else if (item.total === 200000) {
                        bonus = 6000
                    } else if (item.total === 500000) {
                        bonus = 20000
                    } else if (item.total === 1000000) {
                        bonus = 50000
                    }
                })
                console.log(bonus);
                console.log('total: ', total);
                console.log(totalInvests);
            })
        }
        // UsersModel.findOneAndUpdate({ address }, { $set: price + 1 })

        return NextResponse.json({})
    } catch (error) {
        console.log('update status failed: ', error);
        return NextResponse.json({ error })
    }



}