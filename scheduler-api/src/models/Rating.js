const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const RatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    establishment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment'
    },
    rating:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
    }
}, {
    timestamps: true
})

RatingSchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('Rating', RatingSchema)