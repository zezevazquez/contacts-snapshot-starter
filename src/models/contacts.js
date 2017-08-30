const DbContacts = require('./db/contacts')

const createContact = (contact) => {
  return DbContacts.create(contact)
}

const getAllContacts = () => {
  return DbContacts.getAll()
}

const getSingleContact = (contact) => {
  return DbContacts.getSingle()
}

const deleteContact = (contactId) => {
  return DbContacts.deleteSingle(contactId)
}

const searchForContact = (searchQuery) => {
  return DbContacts.searchByName
}

module.exports = {
  createContact,
  getAllContacts,
  getSingleContact,
  deleteContact,
  searchForContact
}
