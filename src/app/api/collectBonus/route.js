import dbConnect from "@/lib/dbConnect"
import UsersModel from "@/lib/models/UsersModel"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"



export async function PUT(req) {
    try {
        const { address, bonus } = await req.json()
        await dbConnect()
        console.log(address, bonus);
        const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: bonus } })
        console.log('object', updatedUser);
        revalidatePath('/wathdraw', 'page')
        revalidatePath('/profits', 'page')
        return NextResponse.json({ message: 'successful' })
    } catch (error) {
        return NextResponse.json({ error })
    }
}