const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.static('public'))

router.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.user = null
  next()
})

router.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 600000
    }
}))



module.exports = router
