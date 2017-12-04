const { Router } = require('express')
const MongoObjectID = require("mongodb").ObjectID
const client = require('prom-client')
const r = Router()
const Database = require('./db')
const log = require('./logger')

module.exports = r

const requestCounter = new client.Counter({
  name: 'module_requests',
  help: 'Module requests counter',
	labelNames: ['module', 'method', 'path']
})

r.route('/')
.post((req, res) => {
  log.debug('Beer creation', req.body)
  Database(db => {
    db.collection('beers')
    .insert(req.body, null, (err, beer) => {
      if (err) {
        log.warn(err)
        return res.status(500).statusMessage(err)
      }
      return res.json(beer)
    })
  })
  requestCounter.labels('beers', 'POST','/').inc()
})
.get((req, res) => {
  log.debug('List all beers')
  Database(db => {
    db.collection('beers').find()
    .toArray((err, beers) => {
      if (err) {
        log.warn(err)
        return res.status(500).statusMessage(err)
      }
      return res.json(beers).send()
    })
  })
  requestCounter.labels('beers', 'GET','/').inc()
})

r.route('/:beerID')
.get((req, res) => {
  log.debug('Get a beer', {beerID: req.params.beerID})
  Database(db => {
    db.collection('beers').findOne({
      _id: new MongoObjectID(req.params.beerID)
    }, (err, beer) => {
      if (err) {
        log.warn(err)
        return res.status(500).statusMessage(err)
      }
      return res.json(beer)
    })
  })
  requestCounter.labels('beers', 'GET','/:beerID').inc()
})
.delete((req, res) => {
  log.debug('Delete a beer', {beerID: req.params.beerID})
  Database(db => {
    db.collection('beers').deleteOne({
      _id: new MongoObjectID(req.params.beerID)
    }, (err, result) => {
      if (err) {
        log.warn(err)
        return res.status(500).statusMessage(err)
      }
      return res.json(result)
    })
  })
  requestCounter.labels('beers', 'DELETE','/:beerID').inc()
})
