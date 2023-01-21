const { ObjectID } = require("bson")
const { text } = require("express")
const mongoose = require("mongoose")

let UsersSchema = new mongoose.Schema({
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
        type: String,
        default: ""
    },
    ethereumaddress: {
        type: String,
        default: ""
    },
    trc20address: {
        type: String,
        default: ""
    },
    account: {
        type: Object,
        required: true
    },
    lastLoggedIn: {
        type: Date, 
        default: Date.now
    },
    timeJoined:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = new mongoose.model("users", UsersSchema)