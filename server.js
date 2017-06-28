const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()


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

app.get('/contacts/new', (request, response) => {
  response.render('new')
})

app.post('/contacts', (request, response) => {
  database.createContact(request.body, function(error, contact){
    if (error) return renderError(error, response, response)
    response.redirect(`/contacts/${contact.id}`)
  })
})

app.get('/contacts/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  database.getContact(contactId, function(error, contact){
    if (error) return renderError(error, response, response)
    if (contact) return response.render('show', { contact })
    next()
  })
})


app.get('/contacts/:contactId/delete', (request, response) => {
  const contactId = request.params.contactId
  database.deleteContact(contactId, function(error){
    if (error) return renderError(error, response, response)
    response.redirect('/')
  })
})

app.get('/search', (request, response) => {
  const query = request.query.q
  database.searchForContact(query, function(error, contacts){
    if (error) return renderError(error, response, response)
    response.render('index', { query, contacts })
  })
})

app.use((request, response) => {
  response.render('not_found')
})

const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
