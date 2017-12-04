const MongoClient = require('mongodb').MongoClient

var DBInstance = null

module.exports = (cb) => {

    ...

    return cb(DBInstance)
}