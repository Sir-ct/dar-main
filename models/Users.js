const { text } = require("express")
const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    fullname:{
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password:{
        type: String,
        required: true
    },
    account: {
        required: true,
        deposits: {
            amount: {type: Number, default: 0.00},
            name:{type: String, default: "Deposits"},
            description: {type: String, default: "Total amount invested"},
            date: {default: Date.now()}
        },
        withdraws: {
            amount: {type: Number, default: 0.00},
            name: {type: String, default: "Withdraws"},
            description: {type: String, default: "total amount withdrawn"},
            date: {default: Date.now()}
        },
        activedeposits: {
            amount: {type: Number, default: 0.00},
            name: {type: String, default: "Active Deposits"},
            description: {type: String, default: "Total active invest"},
            date: {default: Date.now()}
        },
        currentballance: {
            amount: {type: Number, default: 0.00},
            name: {type: String, default: "Current Ballance"},
            description: {type: String, default: "Total withdrawable ballance"}
        }
    },
    timeJoined:{
        type: Date,
        required: true,
        default: Date.now()
    }
})