const mongoose = require('mongoose')

let HistroySchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    type: {
        required: true,
        type: String,
    },
    amount: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: new Date()
    },
    currency:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("transhistory", HistroySchema)