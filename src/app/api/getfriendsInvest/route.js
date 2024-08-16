import dbConnect from "@/lib/dbConnect";  
import UsersModel from "@/lib/models/UsersModel";  
import { NextResponse } from "next/server";  

export async function GET(req) {  
    try {  
        const address = req.nextUrl.searchParams.get("address");  

        await dbConnect();  

        const user = await UsersModel.findOne({ address });  
        if (!user) {  
            return NextResponse.json({ error: "User not found" });  
        }  

        const referralCodes = user.referralCode.map(ref => user.friends.filter(item => item.refCode === ref.refCode)).flat();  

        const totalIncomes = {};  
 
        await Promise.all(referralCodes.map(async (ref) => {  
            const foundFriend = await UsersModel.findOne({ address: ref.address });  
            if (foundFriend) {  
                const refCode = ref.refCode;  

                if (totalIncomes[refCode]) {  
                    totalIncomes[refCode] += foundFriend.investmentValue;  
                } else {  

                    totalIncomes[refCode] = foundFriend.investmentValue;  
                }  
            }  
        }));  

        const investmentSummary = Object.keys(totalIncomes).map(refCode => ({  
            refCode,  
            total: totalIncomes[refCode],  
        }));  

        return NextResponse.json({ message: 'successful', investmentSummary });  
    } catch (error) {  
        console.error("Error fetching investment summary:", error);  
        return NextResponse.json({ error: error.message });  
    }  
}