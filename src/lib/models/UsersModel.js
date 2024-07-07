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
    }
})

const UsersModel = mongoose.models.users || mongoose.model('users', UserSchema)

export default UsersModel