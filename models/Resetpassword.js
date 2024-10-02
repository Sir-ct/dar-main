const mongoose = require('mongoose')

const ResetPasswordSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date()
    }
})

module.exports = new mongoose.model('newpassrequest', ResetPasswordSchema)