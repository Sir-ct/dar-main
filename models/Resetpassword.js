const mongoose = require('mongoose')

const ResetPasswordSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('newpassrequest', ResetPasswordSchema)