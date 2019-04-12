const mongoose = require('mongoose')

const Establishments = mongoose.model('Establishment')

module.exports = {
    async index(req, res){
        const { page = 1, limit = 10 } = req.query
        const establishments = await Establishments.find().populate('owner') //.paginate({ /*filtros*/ }, { page, limit } ).populate('owner')

        return res.json(establishments)
    },

    async show(req, res){
        const establishment = await Establishments.findById(req.params.id)

        return res.json(establishment)
    },

    async store(req, res){
        const establishment = await Establishments.create(req.body)

        return res.json(establishment);
    },

    async update(req, res){
        const establishment = await Establishments.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(establishment);
    },

    async storeService(req, res){
        const establishment = await Establishments.findOneAndDelete(req.params.id)
        console.log(establishment)
        let services = Array.from(req.body)
        services.map((e) => {
            establishment.services.push(e)
        })
        console.log(establishment)
    },

    async destroy(req, res){
        await Establishments.findOneAndDelete(req.params.id)

        return res.send();
    },
}