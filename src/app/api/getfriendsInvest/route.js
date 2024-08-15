import dbConnect from "@/lib/dbConnect";  
import UsersModel from "@/lib/models/UsersModel";  
import { NextResponse } from "next/server";  

export async function GET(req) {  
    try {  
        const address = req.nextUrl.searchParams.get("address");  

        // اتصال به پایگاه داده  
        await dbConnect();  

        // یافتن کاربر اصلی  
        const user = await UsersModel.findOne({ address });  
        if (!user) {  
            return NextResponse.json({ error: "User not found" });  
        }  

        // گرفتن رفرال کد کاربر  
        const referralCodes = user.referralCode.map(ref => user.friends.filter(item => item.refCode === ref.refCode)).flat();  
        
        // شیء برای ذخیره مجموع سرمایه‌گذاری‌ها بر اساس رفرال کد  
        const totalIncomes = {};  

        // استفاده از Promise.all برای انتظاریابی تمامی درخواست‌ها  
        await Promise.all(referralCodes.map(async (ref) => {  
            const foundFriend = await UsersModel.findOne({ address: ref.address });  
            if (foundFriend) {  
                const refCode = ref.refCode;  
                // اگر رفرال کد قبلاً وجود داشت، مقدار سرمایه‌گذاری را اضافه کن   
                if (totalIncomes[refCode]) {  
                    totalIncomes[refCode] += foundFriend.investmentValue;  
                } else {  
                    // در غیر این صورت، مقدار سرمایه‌گذاری را در شیء تنظیم کنید  
                    totalIncomes[refCode] = foundFriend.investmentValue;  
                }  
            }  
        }));  

        // تبدیل شیء به آرایه برای خروجی  
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