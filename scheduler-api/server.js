const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
require('dotenv-safe').load();

const app = express()
app.use(cors())

const server = require('http').Server(app)
const io = require('./src/controller/ChatController').mountChat(server)

app.use((req, res, next) => {
    req.io = io
    return next()
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/scheduler', { useNewUrlParser: true })
requireDir('./src/models')

app.use(require('./src/routes'))

server.listen(process.env.PORT || 3030)