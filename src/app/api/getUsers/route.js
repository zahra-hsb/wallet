import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import UsersModel from "@/lib/models/UsersModel";


let client
let db
let users

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('wallet')
        users = await db.collection('users')
        // console.log('collection: ', users);
    } catch (error) {
        throw new Error('connetion failed')
    }
}

console.log(users);

export async function GET() {
    try {
        await dbConnect()
        // await init();
        users = await UsersModel.find({})

        return NextResponse.json(users);
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}