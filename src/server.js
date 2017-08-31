const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dbContacts = require('./models/db/contacts')
const expressSession = require('express-session')
const app = express()
const {renderError} = require('./server/utils')
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/pages')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.user = null
  next()
})
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 600000
    }
}))

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
