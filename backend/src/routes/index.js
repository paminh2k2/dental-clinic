const homeRouter = require('./home')
const scheduleRouter = require('./schedule')
const profilesRouter = require('./profiles')
const revenueRouter = require('./revenue')
const expenseRouter = require('./expense')
const materialRouter = require('./material')
function route(app) {
  app.use('/material', materialRouter);
  app.use('/expense', expenseRouter);
  app.use('/revenue', revenueRouter);
  app.use('/profiles', profilesRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/', homeRouter);
}

module.exports = route;
