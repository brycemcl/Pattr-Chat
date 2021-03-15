// const axios = require('axios');
const db = require('./dbConnection')
const { resetSchema } = require('./schema')
const { seedUsers } = require('./seeds/users')
const { seedChannels } = require('./seeds/channels')
const { seedConversations } = require('./seeds/conversations')
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

const resetDb = async (databaseStatus) => {
  try {
    await resetSchema(db)
    const tables = await getTables()
    await setupHasura(tables)
    await seedUsers()
    await seedChannels()
    await seedConversations()
    databaseStatus.active = true
  } catch {
    process.exit(1)
  }
}

module.exports = resetDb
