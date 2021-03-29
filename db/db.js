const { connect, connection } = require('mongoose')

const { dbOptions } = require('./db-config')

const DBURL = process.env.DBURL
const logMsg = `\n  >> DB connected to ${DBURL}\n`
const logFun = console.log(logMsg)

const initialize = () => {
  connect(DBURL, dbOptions, logFun)
}

module.exports = {
  initialize,
  connection
}
