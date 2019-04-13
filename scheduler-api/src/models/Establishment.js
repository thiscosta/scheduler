const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const EstablishmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    services: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
    ],
    schedules: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }
    ],
    ratings: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }
    ]
}, {
    timestamps: true
})

EstablishmentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Establishment', EstablishmentSchema)
