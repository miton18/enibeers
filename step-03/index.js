const express = require('express')
const { join } = require('path')
const BeersRouter = require('./beers')
const { json } = require('body-parser')

const app = express()

app.use(json())
app.use('/beers', BeersRouter)
app.use('/public', express.static(join(__dirname, 'public')))

app.listen(8080, () => {
    console.log('Application started')
})
