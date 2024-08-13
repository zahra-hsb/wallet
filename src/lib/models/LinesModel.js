const { Schema, default: mongoose } = require("mongoose");




const LineSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number
    },
    line: {
        type: String
    }
})


const LineModel = mongoose.models.lines || mongoose.model('lines', LineSchema)

export default LineModel