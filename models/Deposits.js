const mongoose = require("mongoose")

let DepositSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    usermail: {
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
    },
    time: {
        type: Date,
        default: new Date()
    }
})

module.exports = new mongoose.model("newdeposits", DepositSchema)