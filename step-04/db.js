const MongoClient = require('mongodb').MongoClient

var DBInstance = null

module.exports = (cb) => {

  if (!DBInstance)
    MongoClient.connect('mongodb://127.0.0.1/rcoll', (err, db) => {
      if (err)
        return console.error(err)

      DBInstance = db
      return cb(DBInstance)
    })
  else
    return cb(DBInstance)
}