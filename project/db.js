const MongoClient = require('mongodb').MongoClient
const log = require('./logger')

var DBInstance = null

module.exports = (cb) => {

  if (!DBInstance)
    MongoClient.connect('mongodb://127.0.0.1/rcoll', (err, db) => {
      if (err)
        return log.error(err)

      DBInstance = db
      return cb(DBInstance)
    })
  else
    return cb(DBInstance)
}