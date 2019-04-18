const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ChatMessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
        timestamps: true
    })

ChatMessageSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('ChatMessage', ChatMessageSchema)