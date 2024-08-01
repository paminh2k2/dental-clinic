const profilesRouter = require('./profilesRoutes')
const servicesRouter = require('./servicesRoutes')
const appointmentsRouter = require('./appointmentsRoutes')

function route(app) {
    app.use('/profiles', profilesRouter)
    app.use('/services', servicesRouter)
    app.use('/appointments', appointmentsRouter)
}

module.exports = route