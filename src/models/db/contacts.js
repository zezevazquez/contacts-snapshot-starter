const db = require('./db')

const create = function(contact){
  return db.query(`
    INSERT INTO
      contacts (first_name, last_name)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      contact.first_name,
      contact.last_name,
    ])
    .catch(error => error);
}

const getAll = function(){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    `, [])
    .catch(error => error);
}

const getSingle = function(contactId){
  return db.one(`
    SELECT * FROM contacts WHERE id=$1::int LIMIT 1
    `,
    [contactId])
    .catch(error => error);
}

const deleteSingle = function(contactId){
  return db.query(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `,
    [contactId])
    .catch(error => error);
}

const searchByName = function(searchQuery){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(first_name || ' ' || last_name) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => error);
}

module.exports = {
  create,
  getAll,
  getSingle,
  deleteSingle,
  searchByName
}
