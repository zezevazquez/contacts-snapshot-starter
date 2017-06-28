const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
const client = new pg.Client(connectionString)
client.connect()

const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const createContact = function(contact, callback){
  query(`
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
    ],
    function(error, results){
      callback(error, results ? results[0] : null)
    }
  )
}

const getContacts = function(callback){
  query(`
    SELECT
      *
    FROM
      contacts
  `, [], callback)
}

const getContact = function(contactId, callback){
  query(`
    SELECT * FROM contacts WHERE id=$1::int LIMIT 1
    `,
    [contactId],
    function(error, results){
      callback(error, results ? results[0] : null)
    }
  )
}

const deleteContact = function(contactId, callback){
  query(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `,
    [contactId],
    callback
  )
}

const searchForContact = function(searchQuery, callback){
  query(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(first_name || ' ' || last_name) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`],
    callback
  )
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact,
}
