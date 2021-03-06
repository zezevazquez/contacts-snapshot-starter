const users = require('../../models/users')
const router = require('express').Router()

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const {email, password, confirm_password} = req.body

  if (password !== confirm_password) {
    res.status(401).render('signup', {error: 'Passwords do not match!'})
  } else {
    users.signUp(email, password)
    .then(function(user) {
      if (user) {
        req.session.name = user[0].email
        res.status(200).redirect('/')
      }
    })
    .catch(err => {
      if (err.code === '23505') {
        res.render('signup', {error: 'Email is in use'})
      }
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const {email, password} = req.body
  console.log('email:::', email, '  password::::', password);

  users.loginUser(email, password)
  .then(function(user) {
    console.log(user, '::: is the user info from models');
    if (user === false || user.validLogin === false) {
      res.status(401).render('login', {error: 'Incorrect email and/or password'})
    } else {
      req.session.name = 'session'
      res.status(200).redirect('/')
    }
  })
  .catch(err => {
    console.log('Logging error::', err)
  })
})

router.get('/logout', (req,res) => {
  req.session.name = null
  res.redirect('/')
})

module.exports = router
