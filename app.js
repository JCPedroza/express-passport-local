require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const db = require('./db/db')
const registerRouter = require('./mvcr/routes/register-router')

db.initialize()

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'mvcr/views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/register', registerRouter)

module.exports = app
