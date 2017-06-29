const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()
const {renderError} = require('./server/utils')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})


app.get('/', (request, response) => {
  database.getContacts(function(error, contacts){
    if (error) return renderError(error, response, response)
    response.render('index', { contacts })
  })
})

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
