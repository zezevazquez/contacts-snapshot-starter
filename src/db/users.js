const db = require('./db')

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
  `,
  [
    email,
    password
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
    email,
    password
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
