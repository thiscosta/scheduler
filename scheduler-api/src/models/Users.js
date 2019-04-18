const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken:{
        type: String
    }
}, {
        timestamps: true
    })

UserSchema.plugin(mongoosePaginate)

module.exports =  mongoose.model('User', UserSchema)
