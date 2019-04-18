const Users = require('../models/Users')
const crypto = require('crypto');
const VerificationController = require('./VerificationController')

class User {
    async index(req, res) {
        let users = await Users.find()

        return res.json(users)
    }

    async show(req, res) {
        if (req.userRole === 'Admin' || req.userId === req.params.id) {
            const user = await Users.findById(req.params.id)

            return res.json(user)
        }

        return res.status(403).json({ success: false, message: 'You haven\'t permission to view this user' })

    }

    async store(req, res) {
        const hash = crypto.createHmac('sha256', process.env.SECRET)
            .update(req.body.password)
            .digest('hex');
        req.body.password = hash

        req.body.role = 'User'

        const user = await Users.create(req.body)

        user.verificationToken = crypto.createHash('sha256').update(user._id.toString()).digest('hex')

        await user.save()

        VerificationController.sendVerificationEmail(user.email, user.verificationToken);

        return res.json(user);
    }

    async update(req, res) {
        const user = await Users.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(user);
    }

    async destroy(req, res) {
        await Users.findOneAndDelete(req.params.id)

        return res.send();
    }
}

module.exports = new User()