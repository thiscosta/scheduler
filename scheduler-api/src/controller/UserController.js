const Users = require('../models/Users')

class User {
    async index(req, res){
        let users =  await Users.find()

        return res.json(users)
    }

    async show(req, res){
        const user = await Users.findById(req.params.id)

        return res.json(user)
    }

    async store(req, res){
        const user = await Users.create(req.body)

        return res.json(user);
    }

    async update(req, res){
        const user = await Users.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(user);
    }

    async destroy(req, res){
        await Users.findOneAndDelete(req.params.id)

        return res.send();
    }
}

module.exports = new User()