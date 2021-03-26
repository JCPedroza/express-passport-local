const get = (req, res, nxt) => {
  const title = 'Register'
  const locals = { title }
  res.render('register', locals)
}

module.exports = {
  get
}
