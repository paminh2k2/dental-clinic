const profilesRouter = require('./profilesRoutes')
const servicesRouter = require('./servicesRoutes')
const revenuesRotuer = require('./revenuesRoutes')

function route(app) {
    app.use('/profiles', profilesRouter)
    app.use('/services', servicesRouter)
    app.use('/revenues', revenuesRotuer)
}

module.exports = route