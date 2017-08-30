const bcrypt = require('bcrypt')

function hash(password) {
  return bcrypt.hash(password, 10).then(function(hash) {
    return hash
  })
}

function comparePasswords(plaintextPassword, hashedPassword) {
  return bcrypt.compare(plaintextPassword, hashedPassword)
    .then(function(response) {
      return response
    })
}

module.exports = {
  hash,
  comparePasswords
}
