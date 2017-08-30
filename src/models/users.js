const USERS = require('./db/users')
const bcrypt = require('./bcrypt')

const signUp = (email, password) => {
  return bcrypt.hash(password).then(hashedPassword => {
    return USERS.create(email, hashedPassword)
  })
}

const loginUser = (email, password) => {
  return USERS.findUserByEmail(email)
    .then(userInfo => {
      if (userInfo.length === 0) {
        return false
      } else {
        return bcrypt.comparePasswords(password, userInfo[0].password)
        .then((res) => {
          console.log('password comparison response::',res);
          return dbResponse = {
            name: userInfo[0].password,
            validLogin:res
          }
        })
      }
    })
}

const getSingleUser = (contact) => {
  return USERS.getSingle()
}

const deleteUser = (contactId) => {
  return USERS.deleteSingle(contactId)
}

const searchForUser = (searchQuery) => {
  return USERS.searchByName
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
  loginUser,
  getSingleUser,
  deleteUser,
  searchForUser,
  confirmPassword,
  emailDuplicates
}
