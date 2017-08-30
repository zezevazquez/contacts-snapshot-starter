const DbUsers = require('./db/users')
const bcrypt = require('./bcrypt')

const signUp = (email, password) => {
  console.log('logging inside signup --Models :::', email, password);
  return bcrypt.hash(password).then(hashedPassword => {
    return DbUsers.create(email, hashedPassword)
  })
}

const getAllUsers = () => {
  return DbUsers.getAll()
}

const getSingleUser = (contact) => {
  return DbUsers.getSingle()
}

const deleteUser = (contactId) => {
  return DbUsers.deleteSingle(contactId)
}

const searchForUser = (searchQuery) => {
  return DbUsers.searchByName
}

const confirmPassword = (password, confirmPassword) => {
  return (password === confirmPassword) ? true : false
}

const emailDuplicates = (error) => {
  if (error.code == '23505') {
    return true
  }
}

module.exports = {
  signUp,
  getAllUsers,
  getSingleUser,
  deleteUser,
  searchForUser,
  confirmPassword,
  emailDuplicates
}
