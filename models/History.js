const mongoose = require('mongoose')

let HistroySchema = new mongoose.Schema({
    userId: {
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
        default: Date.now()
    },
    currency:{
        type: String,
        required: true
    }
})