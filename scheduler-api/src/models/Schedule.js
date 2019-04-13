const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ScheduleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    establishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    services: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Service'/*, required: true */ }
    ],
    date: {
        type: Date,
        required: true
    },
    estimatedDuration: {
        type: Number
    },
    estimatedFinalDate: {
        type: Date
    }
}, {
        timestamps: true
    })

ScheduleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Schedule', ScheduleSchema)