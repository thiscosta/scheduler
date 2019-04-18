const Users = require('../models/Users')

class AuthorizationController {

    constructor() {

    }

    async verifyAdmin(req, res, next) {
        if (req.userRole !== 'Admin') return res.status(403).json({ success: false, message: 'Only admins can view this resource' })
        next()
    }

    async verifyUser(req, res, next) {
        if (req.userRole !== 'User' && req.userRole !== 'Admin') return res.status(403).json({ success: false, message: 'Only users can view this resource' })
        next()
    }

}

module.exports = new AuthorizationController()