const mongoose = require('mongoose')

const Schedules = mongoose.model('Schedule')

module.exports = {
    async index(req, res){
        const schedules = await Schedules.paginate({ /*filtros*/ }, { page: 1, limit: 10 } )

        return res.json(schedules)
    },

    async show(req, res){
        const schedule = await Schedules.findById(req.params.id)

        return res.json(schedule)
    },

    async store(req, res){
        const schedule = await Schedules.create(req.body)

        return res.json(schedule);
    },

    async update(req, res){
        const schedule = await Schedules.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(schedule);
    },

    async destroy(req, res){
        await Schedules.findOneAndDelete(req.params.id)

        return res.send();
    },
}