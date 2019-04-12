const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    establishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

ServiceSchema.plugin(mongoosePaginate)

mongoose.model('Service', ServiceSchema)
