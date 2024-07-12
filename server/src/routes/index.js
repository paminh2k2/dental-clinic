const profilesRouter = require('./profilesRoutes')
const servicesRouter = require('./servicesRoutes')

function route(app) {
    app.use('/profiles', profilesRouter)
    app.use('/services', servicesRouter)
}

module.exports = route