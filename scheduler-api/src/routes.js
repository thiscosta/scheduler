const express = require('express')
const routes = express.Router();

const UserController = require('./controller/UserController')
const EstablishmentController = require('./controller/EstablishmentController')
const RatingController = require('./controller/RatingController')
const ServiceController = require('./controller/ServiceController')
const ScheduleController = require('./controller/ScheduleController')
const LoginController = require('./controller/LoginController')
const VerificationController = require('./controller/VerificationController')
const AuthorizationController = require('./controller/AuthorizationController')

//Login
routes.post('/login', LoginController.login)

//Verification
routes.get('/verification', VerificationController.verifyUser)
routes.post('/verification', VerificationController.sendToken)

//Users
routes.get('/users', LoginController.verifyJWT, AuthorizationController.verifyAdmin, UserController.index)
routes.get('/users/:id', LoginController.verifyJWT, UserController.show)
routes.post('/users', UserController.store)
routes.put('/users/:id', LoginController.verifyJWT, AuthorizationController.verifyAdmin, UserController.update)
routes.delete('/users/:id', LoginController.verifyJWT, AuthorizationController.verifyAdmin, UserController.destroy)

//Establishments
routes.get('/establishments', LoginController.verifyJWT, AuthorizationController.verifyUser, EstablishmentController.index)
routes.get('/establishments/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, EstablishmentController.show)
routes.post('/establishments', LoginController.verifyJWT, AuthorizationController.verifyUser, EstablishmentController.store)
routes.put('/establishments/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, EstablishmentController.update)
routes.delete('/establishments/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, EstablishmentController.destroy)
//Establishment Services

//Schedules
routes.get('/establishments/:id/schedules', LoginController.verifyJWT, AuthorizationController.verifyUser, ScheduleController.index)
routes.get('/schedules/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ScheduleController.show)
routes.post('/establishments/:id/schedules', LoginController.verifyJWT, AuthorizationController.verifyUser, ScheduleController.store)
routes.put('/schedules/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ScheduleController.update)
routes.delete('/schedules/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ScheduleController.destroy)

//Services
routes.get('/establishments/:id/services', LoginController.verifyJWT, AuthorizationController.verifyUser, ServiceController.index)
routes.get('/services/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ServiceController.show)
routes.post('/establishments/:id/services', LoginController.verifyJWT, AuthorizationController.verifyUser, ServiceController.store)
routes.put('/services/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ServiceController.update)
routes.delete('/services/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, ServiceController.destroy)

//Ratings
routes.get('/establishments/:id/ratings', LoginController.verifyJWT, AuthorizationController.verifyUser, RatingController.index)
routes.get('ratings/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, RatingController.show)
routes.post('/establishments/:id/ratings', LoginController.verifyJWT, AuthorizationController.verifyUser, RatingController.store)
routes.put('/ratings/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, RatingController.update)
routes.delete('/ratings/:id', LoginController.verifyJWT, AuthorizationController.verifyUser, RatingController.destroy)

module.exports = routes