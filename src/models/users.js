const DbUsers = require('./db/users')
const bcrypt = require('./bcrypt')

const signUp = (email, password) => {
  console.log('logging inside signup --Models :::', email, password);
  return bcrypt.hash(password).then(hashedPassword => {
    return DbUsers.create(email, hashedPassword)
  })
}

const loginUser = (email, password) => {
  return DbUsers.findUserByEmail(email)
    .then(userInfo => {
      console.log('YOOO userinfo!!!!', userInfo);
      if (userInfo.length === 0) {
        return false
      } else {
        console.log('logging length::::', userInfo.length);
        console.log('USERINFO::::', userInfo);
        return bcrypt.comparePasswords(password, userInfo[0].password)
        .then((res) => {
          console.log('password comparison response::',res);
          return dbResponse = {
            name: userInfo[0].password,
            validLogin:res
          }
        })

      }
      console.log('userInfo:::', userInfo);
  })
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
  loginUser,
  getSingleUser,
  deleteUser,
  searchForUser,
  confirmPassword,
  emailDuplicates
}
