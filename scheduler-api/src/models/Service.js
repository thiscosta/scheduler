const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    estimatedDuration: {
        type: Number,
        required: true,
    }
}, {
        timestamps: true
    })

ServiceSchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('Service', ServiceSchema)
