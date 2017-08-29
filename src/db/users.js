const db = require('./db')

const createUser = (user) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
  `,
  [
    user.email,
    user.password
  ])
  // .catch(error => error.code)
}

const getUser = (user) => {
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE id=$1::int LIMIT 1
  `, [
    user.email,
    user.password
  ])
}

const loginUser = (email, password) => {
  return db.query(`
    SELECT
      email, password
    FROM
      users
    WHERE
      email=$1 AND
      password=$2
  `, [
    email,
    password
  ])
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
  createUser,
  getUser,
  confirmPassword,
  loginUser
}
