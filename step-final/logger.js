const winston = require('winston')
const winstonMongo = require('winston-mongodb')

const logger = new (winston.Logger)
module.exports = logger

logger.level = 'debug'

logger.add(winston.transports.File, {
  filename: 'enibeers.log',
  level: 'debug'
})

logger.add(winston.transports.Console, {
    colorize: true
})

logger.add(winston.transports.MongoDB, {
  db: 'mongodb://127.0.0.1/rcoll',
  level: 'warn',
  collection: 'logs',
  storeHost: true,
  capped: true,
  cappedMax: 20,
  decolorize: true
})