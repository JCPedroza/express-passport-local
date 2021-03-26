const { Router } = require('express')

const registerCtrl = require('../controllers/register-control')

const registerRouter = new Router()
registerRouter
  .route('/')
  .get(registerCtrl.get)
  .post(registerCtrl.post)

module.exports = registerRouter
