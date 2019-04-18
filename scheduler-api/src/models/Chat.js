const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ChatSchema = mongoose.Schema({
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        
    ],
    messages: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }
    ]
}, {
    timestamps: true
})

ChatSchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('Chat', ChatSchema)