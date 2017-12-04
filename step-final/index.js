const express = require('express')
const { join } = require('path')
const morgan = require('morgan')
const client = require('prom-client')
const BeersRouter = require('./beers')
const { json } = require('body-parser')
const log = require('./logger')

const app = express()
const requestCounter = new client.Counter({
  name: 'requests',
  help: 'Request counter'
})

log.info('Enibeers is starting')

app.use(json())
app.use(morgan(':remote-addr :method :url HTTP/:http-version :status :response-time ms', {

}))
app.use('/beers', BeersRouter)
app.use('/public', express.static(join(__dirname, 'public')))
app.use(function (req, res, next) {
  next()
    requestCounter.inc()
})

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
})

app.listen(8080, () => {
    log.info('Application started')
})
