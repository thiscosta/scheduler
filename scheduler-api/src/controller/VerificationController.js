const Users = require('../models/Users')
const sendGrid = require('sendgrid').mail
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
const crypto = require('crypto');


class VerificationController {

    constructor() {
        this.sendVerificationEmail = this.sendVerificationEmail.bind(this)
        this.sendToken = this.sendToken.bind(this)
    }

    async sendVerificationEmail(to, token) {
        const hostUrl = process.env.HOST_URL;
        const request = sg.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: {
                personalizations: [
                    {
                        to: [
                            {
                                email: to
                            }
                        ],
                        subject: "Verify Your Email"
                    }
                ],
                from: {
                    email: "thiscosta@live.com"
                },
                content: [
                    {
                        type: 'text/html',
                        value: `Click on this link to verify your email <a href="${hostUrl}verification?token=${token}&email=${to}">Verificar</a>`
                    }
                ]
            }
        })
        return new Promise(function (resolve, reject) {
            sg.API(request, function (error, response) {
                if (error) {
                    return reject(error);
                }
                else {
                    return resolve(response);
                }
            })
        })
    }

    async sendToken(req, res) {
        const user = await Users.findOne({ _id: req.body.id })
            .then(async (result) => {
                if (!result) return res.status(404).json({ success: false, message: 'User was not found' })

                return result
            })
            .catch(err => {
                if (err.message.indexOf('Cast to ObjectId failed') !== -1)
                    return res.status(404).json({ success: false, message: 'The user with id ' + req.body.id + ' doesn\'t exists' })

                return res.status(404).json({ success: false, message: 'Invalid id provided', err: err.message })
            })

        if(user.verified) return res.status(404).json({ success: false, message: 'The user is already verified' })

        user.verificationToken = crypto.createHash('sha256').update(user._id.toString()).digest('hex')

        await user.save()

        this.sendVerificationEmail(user.email, user.verificationToken)

        return res.status(200).json({ success: true, message: 'Verification e-mail was sent successfully' })
    }

    async verifyUser(req, res) {
        const user = await Users.findOne({ email: req.query.email })
        console.log('user', user)
        console.log('verificationToken = ', req.query.token)
        if (!user) return res.status(404).json({ success: false, message: 'User with email ' + req.query.email + ' was not found' })

        if (user.verified) return res.status(403).json({ success: false, message: 'The user with email ' + req.query.email + ' is already verified' })

        if (user.verificationToken != req.query.token) return res.status(404).json({ success: false, message: 'Invalid verification token' })

        user.verified = true
        user.verificationToken = ''

        await user.save()

        return res.status(200).json({ success: true, message: 'The user was successfully verified!' })
    }

}

module.exports = new VerificationController()