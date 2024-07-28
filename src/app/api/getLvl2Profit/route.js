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
        const friendsWithhLvl2 = user.friends.filter(friend => friend.level == '2').map(friend => friend.address)
        const usersWithPrices = await UsersModel.find({ address: { $in: friendsWithhLvl2 } }).select('price')
        let total = 0
        usersWithPrices.map(item => {
            // item.price >= 10 && item.price <= 99 ?
            total += item.price
        })
        const lvl2Profit = total * 10 / 100
        console.log('lvl2: ', usersWithPrices);
        console.log('lvl2: ', lvl2Profit);
        return NextResponse.json({ lvl2Profit })
    } catch (error) {
        return NextResponse.json({ error })
    }
}