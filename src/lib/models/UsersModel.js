const { Schema, default: mongoose } = require("mongoose");


const UserSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    referralCode: {
        type: String
    },
    price: {
        type: Number
    },
    friends: {
        type: Array,
        items: {
            type: Object,
            properties: {
                address: { type: String },
                amountOfInvest: { type: Number },
                level: { type: String },
                refCodeOfFriend: { type: String }
            }
        }
    }
})

const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema)

export default UsersModel