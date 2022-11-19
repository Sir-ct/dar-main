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
    isadmin: {
        type: Boolean,
        default: false
    },
    bitcoinaddress: {
        type: String
    },
    ethereumaddress: {
        type: String
    },
    trc20address: {
        type: String
    },
    account: {
        type: Object,
        required: true
    },
    lastLoggedIn: {
        type: Date, 
        default: Date.now()
    },
    timeJoined:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = new mongoose.model("users", UsersSchema)