require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const path = require('path')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const passport = require('passport')

const db = require('./db/db')
const auth = require('./auth/auth')

const indexRouter = require('./mvcr/routes/index-router')
const registerRouter = require('./mvcr/routes/register-router')
const loginRouter = require('./mvcr/routes/login-router')

db.initialize()
auth.initialize()

const mongoStore = MongoStore.create({
  mongoUrl: process.env.DBURL
})

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore
}

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'mvcr/views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/register', auth.checkNotAuth, registerRouter)
app.use('/login', auth.checkNotAuth, loginRouter)
app.use('/', auth.checkAuth, indexRouter)
// if index is first there's an infinite request loop, why?

module.exports = app
