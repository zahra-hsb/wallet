import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {

        const referralCode = req.nextUrl.searchParams.get("referralCode");
        console.log(referralCode);
        if (!referralCode) {
            return NextResponse.json({ error: "referralCode parameter is missing" });
        }

        await dbConnect()

        const referrals = await UsersModel.findOne({ referralCode: { $elemMatch: { refCode: referralCode } } });  
        revalidatePath('/bonusvolume', 'page')
        revalidatePath('/referral', 'page')
        // console.log(referrals);
        return NextResponse.json(referrals);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}