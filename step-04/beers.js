const { Router } = require('express')
const MongoObjectID = require("mongodb").ObjectID
const r = Router()
const Database = require('./db')

module.exports = r

r.route('/')
.post((req, res) => {
  console.log('Beer creation', req.body)
  Database(db => {
    db.collection('beers')
    .insert(req.body, null, (err, beer) => {
      if (err)
        return res.status(500).statusMessage(err)
      return res.json(beer)
    })
  })
})
.get((req, res) => {
  console.log('List all beers')
  Database(db => {
    db.collection('beers').find()
    .toArray((err, beers) => {
      if (err)
        return res.status(500).statusMessage(err)
      return res.json(beers).send()
    })
  })
})

r.route('/:beerID')
.get((req, res) => {
  console.log('Get a beer', req.params.beerID)
  Database(db => {
    db.collection('beers').findOne({
      _id: new MongoObjectID(req.params.beerID)
    }, (err, beer) => {
      if (err)
        return res.status(500).statusMessage(err)
      return res.json(beer)
    })
  })
})
.delete((req, res) => {
  console.log('Delete a beer', req.params.beerID)
  Database(db => {
    db.collection('beers').deleteOne({
      _id: new MongoObjectID(req.params.beerID)
    }, (err, result) => {
      if (err)
        return res.status(500).statusMessage(err)
      return res.json(result)
    })
  })
})
