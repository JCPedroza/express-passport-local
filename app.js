require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'mvcr/views'))

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

module.exports = app
