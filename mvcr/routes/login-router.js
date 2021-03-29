const { Router } = require('express')

const loginCtrl = require('../controllers/login-control')

const loginRouter = new Router()

loginRouter
  .route('/')
  .get(loginCtrl.get)
  .post(loginCtrl.post)

module.exports = loginRouter
