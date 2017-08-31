const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const DbContacts = require('../../models/contacts')
const {confirmSession} = require('../utils')


router.use('/contacts', confirmSession)

router.get('/', (req, res) => {
  if(!req.session.name) {
    res.status(401).redirect('/users/login')
  } else {
    DbContacts.getAllContacts()
    .then((contacts) => {res.status(200).render('index', { contacts, user: req.session.name })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts) // /contacts/search
router.use('/users', users) // /users/search

module.exports = router
