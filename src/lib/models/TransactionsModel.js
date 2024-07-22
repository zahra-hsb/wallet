const { Schema, default: mongoose } = require("mongoose");



const TransactionSchema = new Schema({
    trackId: {
        type: String,
        require: true
    },
    status: {
        type: String
    }
})


const TransactionModel = mongoose.models.transactions || mongoose.model('transactions', TransactionSchema)


export default TransactionModel