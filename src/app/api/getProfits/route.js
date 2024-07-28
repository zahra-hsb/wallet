import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get("address")
        if (!address) {
            console.log('address does not exists in database!!!');
        }

        await dbConnect()
        let profit = 0
        let profitValue = 0
        const user = await UsersModel.findOne({ address })

        if (user.price >= 10 && user.price <= 99) {
            console.log('10 until 99');
            profit = 0.7
            profitValue = user.price * profit / 100

        } else if (user.price >= 100 && user.price <= 499) {
            profit = 0.8
            profitValue = user.price * profit / 100
            console.log('100 until 499');
        } else if (user.price >= 500 && user.price <= 999) {
            profit = 0.9
            profitValue = user.price * profit / 100
            console.log('500 until 999');
        } else if (user.price >= 1000 && user.price <= 4999) {
            profit = 1
            profitValue = user.price * profit / 100
            console.log('1000 until 4999');
        } else if (user.price >= 5000 && user.price <= 9999) {
            profit = 1.1
            profitValue = user.price * profit / 100
            console.log('5000 until 9999');
        } else if (user.price >= 10000 && user.price <= 19999) {
            profit = 1.2
            profitValue = user.price * profit / 100
            console.log('10000 until 19999');
        } else if (user.price >= 20000 && user.price <= 29999) {
            profit = 1.3
            profitValue = user.price * profit / 100
            console.log('20000 until 29999');
        } else if (user.price >= 30000 && user.price <= 49999) {
            profit = 1.4
            profitValue = user.price * profit / 100
            console.log('30000 until 49999');
        } else if (user.price >= 50000 && user.price <= 100000) {
            profit = 1.5
            profitValue = user.price * profit / 100
            console.log('50000 until 100000');
        } else {
            console.log('price: 0 < 10');
            return NextResponse.json({ user })
        }
        revalidatePath('/withdraw', 'page')
        return NextResponse.json({ profitValue })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })

    }
}