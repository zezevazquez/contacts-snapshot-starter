const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const DbContacts = require('../../db/contacts');

router.get('/', (req, res) => {
  console.log('reqSession inside of index file::', req.session.name);
  if(!req.session.name) {
    res.redirect('/users/signup')
  } else {
    DbContacts.getContacts()
    .then((contacts) => {res.render('index', { contacts })})
    .catch( err => console.log('err', err) )
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', users); // /users/search

module.exports = router;
