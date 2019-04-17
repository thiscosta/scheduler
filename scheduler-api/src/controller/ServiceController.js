const Services = require('../models/Service')
const Establishments = require('../models/Establishment')

class Service {
    async index(req, res) {
        const establishment = await Establishments.findById(req.params.id).populate('services')

        return res.json(establishment.services)
    }

    async show(req, res) {
        const service = await Services.findById(req.params.id)

        return res.json(service)
    }

    async store(req, res) {
        const establishment = await Establishments.findById(req.params.id)

        const service = await Services.create({
            name: req.body.name,
            description: req.body.description,
            establishment: establishment.id,
            price: req.body.price,
            estimatedDuration: req.body.estimatedDuration
        })

        establishment.services.push(service)

        await establishment.save()

        return res.json(service)
    }

    async update(req, res) {
        const service = await Services.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(service);
    }

    async destroy(req, res) {
        await Services.findOneAndDelete(req.params.id)

        return res.send();
    }
}

module.exports = new Service()