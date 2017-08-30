const db = require('./db')

const create = (email, password) => {
  console.log('userinfo inside of db file:::', email, password);
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
