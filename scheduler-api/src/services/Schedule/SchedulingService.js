const Schedules = require('../../models/Schedule')
const moment = require('moment')

class SchedulingService {

    async isScheduleAvailable(schedule, establishment) {
        const schedules = await Schedules.find({ establishment: establishment.id })
        const scheduleDate = moment(schedule.date)//.format('DD:MM:YYYY HH:mm')

        let scheduleEstimatedDuration = 0
        schedule.services.forEach((e) => {
            scheduleEstimatedDuration += e.estimatedDuration
        })

        let isAvailable = true

        schedules.map((e) => {
            let elementDate = moment(e.date, 'DD:MM:YYYY HH:mm')
            let elementFinalDate = moment(e.estimatedFinalDate)


            let scheduleEstimatedFinalDate = moment(scheduleDate)
            scheduleEstimatedFinalDate.add(scheduleEstimatedDuration, 'minute')

            if ((scheduleDate >= elementDate && scheduleDate <= elementFinalDate) ||
                (scheduleDate <= elementDate && scheduleEstimatedFinalDate >= elementDate)
            ) {
                console.log('passou no false')
                isAvailable = false
            }
        })

        console.log('is Available: ', isAvailable)

        return isAvailable
    }

}

module.exports = new SchedulingService()