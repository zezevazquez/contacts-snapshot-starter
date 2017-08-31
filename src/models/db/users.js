const db = require('./db')

const create = (email, password, role) => {
  console.log('userinfo inside of db file:::', email, password, role);
  return db.query(`
    INSERT INTO
      users (email, password, role)
    VALUES
      ($1::text, $2::text, $3::text)
    RETURNING
      *
  `,
  [
    email,
    password,
    role
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

const findUserByEmail = (email) => {
  return db.query(`
    SELECT
      email, password
    FROM
      users
    WHERE
      email=$1
  `, [
    email
  ])
}

module.exports = {
  create,
  getUser,
  findUserByEmail
}
