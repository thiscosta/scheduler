const express = require('express')
const routes = express.Router();

const UserController = require('./controller/UserController')
const EstablishmentController = require('./controller/EstablishmentController')
const RatingController = require('./controller/RatingController')
const ServiceController = require('./controller/ServiceController')
const ScheduleController = require('./controller/ScheduleController')


//Users
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

//Establishments
routes.get('/establishments', EstablishmentController.index)
routes.get('/establishments/:id', EstablishmentController.show)
routes.post('/establishments', EstablishmentController.store)
routes.put('/establishments/:id', EstablishmentController.update)
routes.delete('/establishments/:id', EstablishmentController.destroy)
routes.post('/establishments/:id/services', EstablishmentController.storeService)

//Schedules
routes.get('/schedules', ScheduleController.index)
routes.get('/schedules/:id', ScheduleController.show)
routes.post('/schedules', ScheduleController.store)
routes.put('/schedules/:id', ScheduleController.update)
routes.delete('/schedules/:id', ScheduleController.destroy)

//Services
routes.get('/services', ServiceController.index)
routes.get('/services/:id', ServiceController.show)
routes.post('/services', ServiceController.store)
routes.put('/services/:id', ServiceController.update)
routes.delete('/services/:id', ServiceController.destroy)

//Ratings
routes.get('/ratings', RatingController.index)
routes.get('/ratings/:id', RatingController.show)
routes.post('/ratings', RatingController.store)
routes.put('/ratings/:id', RatingController.update)
routes.delete('/ratings/:id', RatingController.destroy)

module.exports = routes