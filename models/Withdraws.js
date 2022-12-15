const mongoose = require("mongoose")

let WithdrawSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    usermail: {
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
    status: {
        type: String,
        default: ""
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model("newwithdraws", WithdrawSchema)