const { Schema, default: mongoose } = require("mongoose");


const UserSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    referralCode: {
        type: Array,
        items: {
            type: Object,
            properties: {
                refCode: { type: String },
                line: { type: String },
                users: { type: Number },
                balance: { type: Number }
            }
        }
    },
    price: {
        type: Number
    },
    investmentValue: {
        type: Number
    },
    totalInvestmentLvl1: {
        type: Number
    },
    dailyProfit: {
        type: Number
    },
    friends: {
        type: Array,
        items: {
            type: Object,
            properties: {
                address: { type: String },
                // amountOfInvest: { type: Number },
                level: { type: String },
                line: { type: String },
                // refCodeOfFriend: { type: String }
            }
        }
    }
})

const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema)

export default UsersModel