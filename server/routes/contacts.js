const express = require('express')
const database = require('../../database')
const {renderError} = require('../utils')

const router = express.Router()

router.get('/new', (request, response) => {
  response.render('new')
})

router.post('/', (request, response) => {
  database.createContact(request.body, function(error, contact){
    if (error) return renderError(error, response, response)
    response.redirect(`/contacts/${contact.id}`)
  })
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  database.getContact(contactId, function(error, contact){
    if (error) return renderError(error, response, response)
    if (contact) return response.render('show', { contact })
    next()
  })
})


router.get('/:contactId/delete', (request, response) => {
  const contactId = request.params.contactId
  database.deleteContact(contactId, function(error){
    if (error) return renderError(error, response, response)
    response.redirect('/')
  })
})

router.get('/search', (request, response) => {
  const query = request.query.q
  database.searchForContact(query, function(error, contacts){
    if (error) return renderError(error, response, response)
    response.render('index', { query, contacts })
  })
})

module.exports = router
