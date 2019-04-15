const Schedules = require('../models/Schedule')
const Establishments = require('../models/Establishment')
const Services = require('../models/Service')
const SchedulingService = require('../services/Schedule/SchedulingService')
const moment = require('moment')

class Schedule {
    async index(req, res) {
        const establishments = await Establishments.findById(req.params.id).populate({
            path: 'schedules',
            populate: { path: 'services' }
        })

        return res.json(establishments.schedules)
    }

    async show(req, res) {
        const schedule = await Schedules.findById(req.params.id).populate({
            path: 'schedules',
            populate: { path: 'services' }
        })

        return res.json(schedule)
    }

    async store(req, res) {
        const establishment = await Establishments.findById(req.params.id).populate({
            path: 'schedules',
            populate: { path: 'services' }
        })

        if (await SchedulingService.isScheduleAvailable(req.body, establishment)) {
            //req.io.sockets.in(box._id).emit('schedule', schedule)

            const schedule = await Schedules.create({
                date: req.body.date,
                user: req.body.user,
                establishment: establishment.id,
                estimatedDuration: 0,
                estimatedFinalDate: req.body.date
            })

            Array.from(req.body.services).map((e) => {
                schedule.services.push(e.id)
                schedule.estimatedDuration += e.estimatedDuration
            })

            schedule.estimatedFinalDate = moment(schedule.date)
            .add(schedule.estimatedDuration, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss')

            await schedule.save()

            establishment.schedules.push(schedule)
            await establishment.save()

            await SchedulingService.sendScheduleNotification()

            return res.json(schedule)
        }

        return res.json({
            success: false,
            msg: 'There are already schedules for the chosen time, please try another'
        })
    }

    async update(req, res) {
        const schedule = await Schedules.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(schedule);
    }

    async destroy(req, res) {
        await Schedules.findByIdAndDelete(req.params.id)
        return res.send();
    }
}

module.exports = new Schedule()