import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        if (!address) {
            console.log('address does not exists!!!');
        }
        await dbConnect()

        const user = await UsersModel.findOne({ address })
        const friendsWithhLvl1 = user.friends.filter(friend => friend.level == '1').map(friend => friend.address)
        const usersWithPrices = await UsersModel.find({ address: { $in: friendsWithhLvl1 } }).select('price')
        let total = 0
        usersWithPrices.map(item => {
            // item.price >= 10 && item.price <= 99 ?
            total += item.price
        })
        const lvl1Profit = total * 15 / 100
        console.log('lvl1: ', usersWithPrices);
        console.log('lvl1: ', lvl1Profit);
        return NextResponse.json({ lvl1Profit })
    } catch (error) {
        return NextResponse.json({ error })
    }
}