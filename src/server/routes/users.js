const dbUsers = require('../../db/users')
const {renderError} = require('../utils')
const bcrypt = require('../../db/bcrypt')
const router = require('express').Router()

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const {email, password} = req.body

  if (!dbUsers.confirmPassword(req.body.password, req.body.confirm_password)) {
    res.render('signup', {error: 'Passwords do not match!'})
  } else {

    bcrypt.hash(password)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      console.log(email);
      dbUsers.createUser(email, hashedPassword)
      .then(function(user) {
        console.log(user);
        if (user) {
          req.session.name = user[0].email
          res.redirect('/')
        }
      })
      .catch(err => {
        if (err.code === '23505') {
          res.render('signup', {error: 'Email is in use'})
        }
      })
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const {email, password} = req.body
  console.log(email, password);
  bcrypt.comparePasswords()
  dbUsers.loginUser(email, password)
  .then(function(user) {
    if (user.length === 0) {
      res.render('login', {error: 'Incorrect email and/or password'})
    } else {
      req.session.name = user[0].email
      res.redirect('/')
    }
  })
  .catch(err => {
    console.log('Logging error::', err)
  })
  // res.render('login')
})

router.get('/logout', (req,res) => {
  req.session.name = null
  res.redirect('/')
})

router.get('/:userId', (req, response, next) => {
  const userId = req.params.userId
  if (!userId || !/^\d+$/.test(userId)) return next()
  dbUsers.getUser(userId)
    .then(function(user) {
      if (user) return response.render('show', { user })
      next()
    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
