const express = require('express')
const cluster = require('cluster')
const { cpus } = require('os')
const { join } = require('path')
const morgan = require('morgan')
const client = require('prom-client')
const BeersRouter = require('./beers')
const { json } = require('body-parser')
const log = require('./logger')

if (cluster.isMaster) {
  for (let i=0; i<cpus().length; i++) {
    cluster.fork()
  }
}

if (cluster.isWorker) {

  const app = express()
  const requestCounter = new client.Counter({
    name: 'requests',
    help: 'Request counter'
  })
  const requestDuration = new client.Histogram({
    name: 'requests_duration',
    help: 'Time the server take to respond to clients',
    buckets: [0.003, 0.03, 0.1, 0.3, 1.5, 10]
  })

  log.info('Enibeers is starting')

  app.use(json())
  app.use((req, res, next) => {
    let end = requestDuration.startTimer()
    res.setHeader('X-Enibeers-Worker', cluster.worker.id)

    next()

    end()
    requestCounter.inc()
  })
  app.use(morgan(':remote-addr :method :url HTTP/:http-version :status :response-time ms'))
  app.use('/beers', BeersRouter)
  app.use('/public', express.static(join(__dirname, 'public')))

  app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
  })

  app.listen(8080, () => {
    log.info(`Enibeers ${ cluster.worker.id } started`)
  })
}
