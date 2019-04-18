const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

class LoginController {

    async verifyJWT(req, res, next) {
        var token = req.headers['x-access-token']
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided' })

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' })

            req.userId = decoded.id

            const user = await Users.findById(decoded.id)

            if (!user.verified) return res.status(401).send({ auth: false, message: 'The user isn\'t verified' })

            req.userRole = user.role
            
            next()
        })
    }

    async login(req, res, next) {

        const hash = crypto.createHmac('sha256', process.env.SECRET)
            .update(req.body.password)
            .digest('hex');


        const user = await Users.findOne({
            email: req.body.email,
            password: hash
        })

        if (user) {
            const id = user._id
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            })
            return res.status(200).send({ auth: true, token: token })
        }

        return res.status(400).send({ auth: false, token: null, message: 'User not found' })
    }

}

module.exports = new LoginController()