const express = require('express')

const ongsController = require('./controllers/OngsController')
const incidentsController = require('./controllers/IncidentsController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', sessionController.create)

routes.post('/ongs', ongsController.create)
routes.get('/ongs', ongsController.index)

routes.post('/incidents', incidentsController.create)
routes.get('/incidents', incidentsController.index)
routes.delete('/incidents/:id', incidentsController.delete)

routes.get('/profile', profileController.index)

module.exports = routes