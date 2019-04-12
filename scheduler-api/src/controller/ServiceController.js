const mongoose = require('mongoose')

const Services = mongoose.model('Service')

module.exports = {
    async index(req, res){
        const services = await Services.paginate({ /*filtros*/ }, { page: 1, limit: 10 } )

        return res.json(services)
    },

    async show(req, res){
        const service = await Services.findById(req.params.id)

        return res.json(service)
    },

    async store(req, res){
        const service = await Services.create(req.body)

        return res.json(service);
    },

    async update(req, res){
        const service = await Services.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(service);
    },

    async destroy(req, res){
        await Services.findOneAndDelete(req.params.id)

        return res.send();
    },
}