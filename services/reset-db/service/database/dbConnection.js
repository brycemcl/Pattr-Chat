(() => {
  const dbParams = {}
  dbParams.connectionString = process.env.HASURA_GRAPHQL_DATABASE_URL
  // PG database client/connection setup
  const { Pool } = require('pg').native
  const db = new Pool(dbParams)
  db.connect()

  module.exports = db
})()
