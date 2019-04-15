const Schedules = require('../../models/Schedule')
const moment = require('moment')

class SchedulingService {

    async isScheduleAvailable(schedule, establishment) {
        const schedules = await Schedules.find({ establishment: establishment.id })
        const scheduleDate = moment(schedule.date)

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
                isAvailable = false
            }
        })

        return isAvailable
    }

    async sendScheduleNotification() {

        var message = {
            app_id: "84af63b9-4b44-4094-9931-dbfcec94781a",
            contents: { "en": "Novo agendamento"},
            included_segments: ["All"]
        }

        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic N2I4OWJhOWYtYTY3OS00YTgyLWJmNTUtZjc4NDU0YWMwMDE2"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');
        var req = https.request(options, function (res) {
            res.on('data', function (message) {
                console.log("Response:");
                console.log(JSON.parse(message));
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(message));
        req.end();

    }

}

module.exports = new SchedulingService()