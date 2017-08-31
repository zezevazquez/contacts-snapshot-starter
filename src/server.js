const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dbContacts = require('./models/db/contacts')
const expressSession = require('express-session')
const app = express()
const {renderError, confirmSession} = require('./server/utils')
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname ,'/views'),
  path.join(__dirname ,'/views/pages'),
  path.join(__dirname ,'/views/partials')])

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.admin = null
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

app.use('/contacts', confirmSession)

app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
