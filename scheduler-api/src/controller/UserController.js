const mongoose = require('mongoose')

const User = mongoose.model('User')

module.exports = {
    async index(req, res){
        let { page, limit } = req.query
        let users = []
        if(page || limit){
            !page ? page = 1 : page = page
            !limit ? limit = 10 : limit = limit
            users = await User.paginate({ /*filtros*/ }, { page, limit: parseInt(limit) } )
        }
        else{
            users = await User.find()
        }     

        return res.json(users)
    },

    async show(req, res){
        const user = await User.findById(req.params.id)

        return res.json(user)
    },

    async store(req, res){
        const user = await User.create(req.body)

        return res.json(user);
    },

    async update(req, res){
        const user = await User.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(user);
    },

    async destroy(req, res){
        await User.findOneAndDelete(req.params.id)

        return res.send();
    },
}