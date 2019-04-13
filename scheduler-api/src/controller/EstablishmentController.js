const Establishments = require('../models/Establishment')
const Services = require('../models/Service')

class Establishment {
    
    async index(req, res){
        const establishments = await Establishments.find().populate('owner').populate('ratings')
        .populate('schedules').populate('services')
        return res.json(establishments)
    }

    async show(req, res){
        const establishment = await Establishments.findById(req.params.id).populate('services')

        return res.json(establishment)
    }

    async store(req, res){
        const establishment = await Establishments.create(req.body)

        return res.json(establishment);
    }

    async update(req, res){
        const establishment = await Establishments.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(establishment);
    }

    async destroy(req, res){
        await Establishments.findOneAndDelete(req.params.id)

        return res.send();
    }
    
}

module.exports = new Establishment()