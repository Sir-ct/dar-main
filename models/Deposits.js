const mongoose = require("mongoose")

let DepositSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("newdeposits", DepositSchema)