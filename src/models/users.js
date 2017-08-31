const users = require('./db/users')
const bcrypt = require('./bcrypt')

const signUp = (email, password, role) => {
  if (email.includes('.admin')) {
    role = 'admin'
  } else {
    role = 'regular'
  }
    return hashPassword(password).then(hashedPassword => {
      return users.create(email, hashedPassword, role)
    })
  }


const hashPassword = (password) => {
  return bcrypt.hash(password)
}

const loginUser = (email, password) => {
  return users.findUserByEmail(email)
    .then(userInfo => {
      if (userInfo.length === 0) {
        return false
      } else {
        return bcrypt.comparePasswords(password, userInfo[0].password)
      }
    })
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
  confirmPassword,
  emailDuplicates
}
