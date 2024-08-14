import dbConnect from "@/lib/dbConnect";
import LineModel from "@/lib/models/LinesModel";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const cron = require('node-cron')

export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get("address")
        if (!address) {
            console.log('address does not exists!!!');
        }
 
        await dbConnect()
        let profit = 0
        let isDecuple = false
        let profitValue = 0
        const user = await UsersModel.findOne({ address })

        if (user.investmentValue >= 10 && user.investmentValue <= 99) {
            console.log('10 until 99');
            profit = 0.7
            profitValue = user.investmentValue * profit / 100

            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 100 && user.investmentValue <= 499) {
            profit = 0.8
            profitValue = user.investmentValue * profit / 100
            console.log('100 until 499');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 500 && user.investmentValue <= 999) {
            profit = 0.9
            profitValue = user.investmentValue * profit / 100
            console.log('500 until 999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 1000 && user.investmentValue <= 4999) {
            profit = 1
            profitValue = user.investmentValue * profit / 100
            console.log('1000 until 4999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 5000 && user.investmentValue <= 9999) {
            profit = 1.1
            profitValue = user.investmentValue * profit / 100
            console.log('5000 until 9999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 10000 && user.investmentValue <= 19999) {
            profit = 1.2
            profitValue = user.investmentValue * profit / 100
            console.log('10000 until 19999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 20000 && user.investmentValue <= 29999) {
            profit = 1.3
            profitValue = user.investmentValue * profit / 100
            console.log('20000 until 29999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 30000 && user.investmentValue <= 49999) {
            profit = 1.4
            profitValue = user.investmentValue * profit / 100
            console.log('30000 until 49999');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else if (user.investmentValue >= 50000 && user.investmentValue <= 100000) {
            profit = 1.5
            profitValue = user.investmentValue * profit / 100
            console.log('50000 until 100000');
            const updatedUserPrice = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })

            const updatedUserProfit = await UsersModel.findOneAndUpdate({ address }, { $set: { dailyProfit: profitValue } })
            cron.schedule('0 0 * * *', async () => {
                const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: profitValue } })
                console.log('updatedUser: ', updatedUser);
                const profit = updatedUser.price - updatedUser.investmentValue
                const isDailyProfit = profit / 10
                if (isDailyProfit == profit) {
                    isDecuple = true
                }
            })
            const triplePrice = updatedUserProfit.investmentValue * 3
            const invest = await LineModel.findOne({ address })
            let resultTriplePrice;
            invest.lines.forEach(item => {
                if(item.bonus > 0) {
                    resultTriplePrice = updatedUserProfit.price - item.bonus
                }
            });
            if (resultTriplePrice > triplePrice) {
                // const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $set: { price: 0 } })
                console.log('the price have refresh to 0 => ', updatedUser);
            }
        } else {
            console.log('price: 0 < 10');
            isDecuple = false
            return NextResponse.json({ user })
        }
        revalidatePath('/withdraw', 'page')
        return NextResponse.json({ profitValue, isDecuple })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })

    }
}