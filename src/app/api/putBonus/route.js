import LineModel from '@/lib/models/LinesModel';
import UsersModel from '@/lib/models/UsersModel';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { address } = await request.json();

        const user = await UsersModel.findOne({ address });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const referrals = user.referralCode || [];
        const friendsArray = user.friends || [];
        let totalInvests = {};
        let bonus = 0;

        for (const referral of referrals) {
            const friendsInLine = friendsArray.filter(item => item.line === referral.line);

            if (friendsInLine.length === 0) continue;

            let lineTotal = 0;

            for (const friend of friendsInLine) {
                const friendUser = await UsersModel.findOne({ address: friend.address });

                if (friendUser) {
                    lineTotal += friendUser.investmentValue || 0;
                }
            }
            // console.log(lineTotal);


            totalInvests[referral.line] = (totalInvests[referral.line] || 0) + lineTotal;
            console.log(totalInvests);

        }
        const userInvestmentTotal = await UsersModel.aggregate([
            { $match: { address } },
            { $group: { _id: null, totalInvestment: { $sum: "$investmentValue" } } }
        ]);

        const totalInvestmentValue = userInvestmentTotal[0]?.totalInvestment || 0;

        for (const line in totalInvests) {
            const existingLine = await LineModel.findOne({ address, "lines.line": line });
            const total = totalInvests[line];
            // console.log(existingLine.lines);
            existingLine.lines.forEach(async item => {
                console.log(item.total, bonus);
                if (item.total >= 10000) bonus = 200;
                else if (item.total >= 20000) bonus = 500;
                else if (item.total >= 50000) bonus = 1500;
                else if (item.total >= 100000) bonus = 3000;
                else if (item.total >= 200000) bonus = 6000;
                else if (item.total >= 500000) bonus = 20000;
                else if (item.total >= 1000000) bonus = 50000;
                else bonus = 0

                await LineModel.findOneAndUpdate({ address, "lines.line": item.line }, { $set: { "lines.$.bonus": bonus } });
                // !! condition for 30 % in another line
                const conditionMet = totalInvestmentValue > 0 && (item.total / totalInvestmentValue) >= 0.3;

                // !! if there is condition then save and increment the bonus into the price 
                if (conditionMet) {
                    console.log(conditionMet)
                    await UsersModel.findOneAndUpdate({ address }, { $inc: { price: bonus } });
                }
            });

            if (existingLine) {
                await LineModel.updateOne(
                    { address, "lines.line": line },
                    { $set: { "lines.$.total": total } }
                );
            } else {
                await LineModel.findOneAndUpdate(
                    { address },
                    { $push: { lines: { line, total } } },
                    { new: true, upsert: true }
                );
            }
        }
        const lvlInvestsArray = await Promise.all(friendsArray.map(async (item) => {
            const friendUser = await UsersModel.findOne({ address: item.address });
            return friendUser ? friendUser : 0;
        }));

        console.log(lvlInvestsArray);

        return NextResponse.json({ success: true, totalInvests, bonus, lvlInvestsArray });
    } catch (error) {
        console.error('Update status failed: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}