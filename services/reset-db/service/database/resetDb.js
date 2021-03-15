// const axios = require('axios');
const db = require('./dbConnection')
const { resetSchema } = require('./schema')
const { seedUsers } = require('./seeds/users')
const { setupHasura } = require('./seeds/hasura')

const getTables = async () => {
  return await db
    .query(
      `
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
    `
    )
    .then((res) => res.rows.map((row) => row.table_name))
}

const getFkInTable = async (table) => {
  // SELECT
  //     tc.table_schema,
  //     -- tc.constraint_name,
  //     tc.table_name,
  //     kcu.column_name,
  //     ccu.table_schema AS foreign_table_schema,
  //     ccu.table_name AS foreign_table_name,
  //     -- ccu.column_name AS foreign_column_name
  const query = await db.query(`
    SELECT
        tc.table_schema,
        tc.table_name,
        kcu.column_name,
        ccu.table_schema AS foreign_table_schema,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name 
    FROM
        information_schema.table_constraints AS tc 
    JOIN
        information_schema.key_column_usage AS kcu 
            ON tc.constraint_name = kcu.constraint_name 
            AND tc.table_schema = kcu.table_schema 
    JOIN
        information_schema.constraint_column_usage AS ccu 
            ON ccu.constraint_name = tc.constraint_name 
            AND ccu.table_schema = tc.table_schema 
    WHERE
        tc.constraint_type = 'FOREIGN KEY' 
        AND tc.table_name='${table}';
  `)
  return query.rows
}

const getFkInDatabase = async () => {
  const tb = []
  let fk = []
  const tables = await getTables()
  tables.forEach(async (table) => {
    tb.push(getFkInTable(table))
  })
  await Promise.all(tb)
  for (const table of tb) {
    const tbl = await table
    fk = [...fk, ...tbl]
  }
  return fk
}

const resetDb = async (databaseStatus) => {
  try {
    await resetSchema(db)
    const tables = await getTables()
    const fk = await getFkInDatabase()
    await setupHasura(tables, fk)
    await seedUsers()
    databaseStatus.active = true
  } catch {
    process.exit(1)
  }
}

module.exports = resetDb
