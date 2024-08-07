import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";
const cron = require('node-cron')


export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        if (!address) {
            console.log('address does not exists!!!');
        }
        await dbConnect()

        const user = await UsersModel.findOne({ address })
        const friendsWithhLvl2 = user.friends.filter(friend => friend.level == '2').map(friend => friend.address)
        const usersWithPrices = await UsersModel.find({ address: { $in: friendsWithhLvl2 } }).select('dailyProfit')
        let total = 0
        usersWithPrices.map(item => {
            if (item.dailyProfit) {
                total += item.dailyProfit * 10 / 100
            }
        })

        if(total != 0) {
            console.log('address: ', address);
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: total } })
                console.log('updatedUser: ', updatedUser);
            })
            const decuple = total * 10

        }
        
        console.log('lvl2: ', usersWithPrices);
        console.log('lvl2: ', total);
        return NextResponse.json({ lvl2Profit: total })
    } catch (error) {
        return NextResponse.json({ error })
    }
}