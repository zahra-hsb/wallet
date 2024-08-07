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
        const friendsWithhLvl1 = user.friends.filter(friend => friend.level == '1').map(friend => friend.address)
        const usersWithPrices = await UsersModel.find({ address: { $in: friendsWithhLvl1 } }).select('dailyProfit')
        let total = 0
        console.log(usersWithPrices);
        usersWithPrices.map(item => {
            if(item.dailyProfit) {
                total += item.dailyProfit * 15 / 100
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
        console.log('lvl1: ', total);
        return NextResponse.json({ lvl1Profit: total })
    } catch (error) { 
        return NextResponse.json({ error })
    }
}