const db = require('./db')

const create = (email, password, admin) => {
  console.log('userinfo inside of db file:::', email, password, admin);
  return db.query(`
    INSERT INTO
      users (email, password, admin)
    VALUES
      ($1::text, $2::text, $3::text)
    RETURNING
      *
  `,
  [
    email,
    password,
    admin
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
