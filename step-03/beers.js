const { Router } = require('express')
const r = Router()

module.exports = r

var beersSample = require('./beers-sample.json')
console.log(`loaded ${ beersSample.length } beers`)

r.route('/')
.post((req, res) => {
    console.log('Beer creation', req.body)
    beersSample.push(req.body)
    return res.json(req.body).send()
})
.get((req, res) => {
    console.log('List all beers')
    return res.json(beersSample).send()
})

r.route('/:beerID')
.get((req, res) => {
    console.log('Get a beer', req.params.beerID)
    res.json(beersSample.find(beer => {
        return beer.id === req.params.beerID
    }))
})
.delete((req, res) => {
    console.log('Delete a beer', req.params.beerID)
    beersSample = beersSample.filter(beer => {
        return beer.id !== req.params.beerID
    })
    res.json({})
})
