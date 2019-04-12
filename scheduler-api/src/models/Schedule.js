const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ScheduleSchema = mongoose.Schema({
    services:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }
    ],
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

ScheduleSchema.plugin(mongoosePaginate)

mongoose.model('Schedule', ScheduleSchema)