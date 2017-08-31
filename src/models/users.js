const users = require('./db/users')
const bcrypt = require('./bcrypt')

const signUp = (email, password, role) => {
  if (email.includes('.admin')) {
    role = 'admin'
  } else {
    role = 'regular'
  }
  return bcrypt.hash(password).then(hashedPassword => {
    return users.create(email, hashedPassword, role)
  })
}

const loginUser = (email, password) => {
  return users.findUserByEmail(email)
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
