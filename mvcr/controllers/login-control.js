const passport = require('passport')

const get = (req, res, nxt) => {
  const title = 'Login'
  const locals = { title }
  res.render('login', locals)
}

const post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})

module.exports = {
  get,
  post
}
