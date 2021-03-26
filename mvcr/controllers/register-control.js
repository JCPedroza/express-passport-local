const { hash } = require('bcrypt')

const User = require('../models/user-model')

const get = (req, res, nxt) => {
  const title = 'Register'
  const locals = { title }
  res.render('register', locals)
}

const post = async (req, res, nxt) => {
  const SALTS = parseInt(process.env.SALTS)
  try {
    const user = {
      username: req.body.username,
      password: await hash(req.body.password, SALTS),
      email: req.body.email
    }
    await User.create(user)
    res.redirect('login')
  } catch (err) {
    nxt(err)
  }
}

module.exports = {
  get,
  post
}
