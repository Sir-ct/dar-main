const mongoose = require("mongoose")

let ReferalSchema = new mongoose.Schema({
    userid : {
        type: String,
        required: true
    },
    reflink: {
        required: true,
        type: String
    },
    referrer: {
        type: String,
    },
    commissions: {
        type: Number
    },
    yourrefs: {
        type: Array
    }
})