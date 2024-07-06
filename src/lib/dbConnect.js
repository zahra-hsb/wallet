import mongoose, { connect } from "mongoose";
import clientPromise from "./mongodb";

const connection = {}
const uri = 'mongodb://localhost/wallet'


async function dbConnect() {
    if (connection.isConnected) {
        return
    }
    try {

        // const db = await mongoose.connect(process.env.MONGODB_URI);
        const db = await mongoose.connect(uri);
        
        connection.isConnected = db.connections[0].readyState
    } catch (err) {
        console.log('mongo error:', err);
    }
}


export default dbConnect