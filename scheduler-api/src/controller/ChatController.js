const Chats = require('../models/Chat')
const ChatMessages = require('../models/ChatMessages')
const Users = require('../models/Users')

class ChatController {

    constructor() {
        this.handleConnection = this.handleConnection.bind(this)
    }

    async mountChat(server) {
        const io = require('socket.io')(server)

        io.on('connection', socket => {
            socket.on('startChat', async (participants) => {
                const chat = await this.handleConnection(participants, socket)
                io.to(chat._id).emit('startedChat', chat.messages);
            })

            socket.on('message', async message => {
                const data = await this.handleNewMessage(message)
                io.to(data.chat._id).emit('newMessage', data.message);

            })

            // socket.on('message', (message) => {
            //     io.to('teste').emit('newMessage', message);

            // })
        })

        return io
    }

    async handleConnection(participants, socket) {
        const chats = await Chats.find().populate('users').populate({
            path: 'messages', model: ChatMessages,
            populate: [{
                path: 'sender',
                model: Users
            }, {
                path: 'receiver',
                model: Users
            }]
        })
        let chat = null

        console.log('chats: ', chats)

        chats.forEach(async (e) => {

            if (
                (e.users[0]._id == participants[0]._id && e.users[1]._id == participants[1]._id) ||
                (e.users[1]._id == participants[0]._id && e.users[0]._id == participants[1]._id)
            ) {
                chat = e
                return
            }
        })

        if (!chat) {
            const newChat = await Chats.create({
                users: [
                    participants[0]._id,
                    participants[1]._id
                ],
                messages: []
            })
            chat = newChat
        }

        socket.join(chat._id)

        return chat
    }

    async handleNewMessage(message) {
        const chats = await Chats.find().populate('users')
        let chat = null

        chats.forEach((e) => {

            if (
                (e.users[0]._id == message.sender._id && e.users[1]._id == message.receiver._id) ||
                (e.users[1]._id == message.sender._id && e.users[0]._id == message.receiver._id)
            ) {
                chat = e
                return
            }
        })

        let chatSender
        let chatReceiver

        chat.users.forEach((user) => {
            if (user._id == message.sender._id)
                chatSender = user
            else
                chatReceiver = user
        })

        const newMessage = await ChatMessages.create({
            sender: chatSender,
            receiver: chatReceiver,
            message: message.message
        })

        chat.messages.push(newMessage)

        await chat.save()

        return { message: newMessage, chat: chat }
    }

}

module.exports = new ChatController()