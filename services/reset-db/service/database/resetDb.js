const db = require('./dbConnection')
const { resetSchema } = require('./schema')

const logTables = async () => {
  console.log(
    await db
      .query(
        `
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
    `
      )
      .then((res) => res.rows.map((row) => row.table_name))
  )
}
setInterval(logTables, 1000)

const resetDb = async (databaseStatus) => {
  try {
    await resetSchema(db)
    databaseStatus.active = true
  } catch {
    process.exit(1)
  }
}

module.exports = resetDb
