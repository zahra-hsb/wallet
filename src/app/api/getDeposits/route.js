import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        const address = req.nextUrl.searchParams.get("address");
        if (!address) {
            return NextResponse.json({ error: "address parameter is missing" });
        }
        await dbConnect();


        const user = await UsersModel.findOne({ address: address });


        if (!user) {
            return { error: 'the user does not exists' };
        }
 

        const friendsWithLevel1 = user.friends.filter(friend => friend.level === '1').map(friend => friend.address);
        const friendsWithLevel2 = user.friends.filter(friend => friend.level === '2').map(friend => friend.address);
        const friendsWithLevel3 = user.friends.filter(friend => friend.level === '3').map(friend => friend.address);


        const usersWithPrices1 = await UsersModel.find({
            address: { $in: friendsWithLevel1 }
        }).select('price').exec();
        const usersWithPrices2 = await UsersModel.find({
            address: { $in: friendsWithLevel2 }
        }).select('price').exec();
        const usersWithPrices3 = await UsersModel.find({
            address: { $in: friendsWithLevel3 }
        }).select('price').exec();

        const usersWithPrices = [usersWithPrices1, usersWithPrices2, usersWithPrices3]
        return NextResponse.json({ usersWithPrices });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

 