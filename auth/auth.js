const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

const User = require('../mvcr/models/user-model')

const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) {
      done(null, false, { message: 'username not found' })
    } else if (await compare(password, user.password)) {
      done(null, user)
    } else {
      done(null, false, { message: 'incorrect password' })
    }
  } catch (err) {
    done(err)
  }
}

const serializeUser = (user, done) => done(null, user._id)

const deserializeUser = async (id, done) => {
  try {
    done(null, await User.findById(id))
  } catch (err) {
    done(err)
  }
}

const initialize = () => {
  passport.use(new Strategy(verify))
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)
}

const checkAuth = (req, res, nxt) => {
  if (req.isAuthenticated()) {
    nxt()
  } else {
    res.redirect('/login')
  }
}

const checkNotAuth = (req, res, nxt) => {
  if (req.isAuthenticated()) {
    res.redirect('/')
  } else {
    nxt()
  }
}

module.exports = {
  initialize,
  checkAuth,
  checkNotAuth
}
