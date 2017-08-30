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

const loginUser = (email, password) => {
  console.log('client email:::', email, 'client password::', password);
  return db.query(`
    SELECT
      email, password
    FROM
      users
    WHERE
      email=$1
  `, [
    email
  ]). then(userInfo => {
    console.log('userInfo:::', userInfo);
    return bcrypt.comparePasswords(password, userInfo[0].password)
    .then((res) => {
      console.log('password comparison response::',res);
      return res
    })
  })
}



module.exports = {
  create,
  getUser,
  loginUser
}
