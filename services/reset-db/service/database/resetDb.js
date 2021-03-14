// const axios = require('axios');
const db = require('./dbConnection');
const { resetSchema } = require('./schema');
const { seedUsers } = require('./seeds/users');
const { setupHasura } = require('./seeds/hasura');

const getTables = async () => {
  return await db
    .query(
      `
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
    `
    )
    .then((res) => res.rows.map((row) => row.table_name));
};

const getFkInTable = async (table) => {
  // const query = db.query(`
  const query = await db.query(`
    SELECT
        tc.table_schema,
        tc.constraint_name,
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
  `);
  return query;
};

const getFkInDatabase = async () => {
  // const fk = [];
  const fk = [];
  const tables = await getTables();
  console.log('-------------------------------------------');
  console.log(tables);
  console.log('-------------------------------------------');

  tables.forEach(async (table) => {
    const tb = await getFkInTable(table);
    fk.push(tb);
  });
  console.log(fk);
  await Promise.all(fk);
  fk.map((item) => {
    console.log(item.rows);
    return item.rows;
  });
  await Promise.all(fk);
  // tables.forEach((table) => {
  //   console.log(table);
  //   fk.push(table);
  // });
  // return fk;
};

// setInterval(() => console.log(getTables()), 1000);

// const logUsers = async () => {
//   console.log(
//     await db
//       .query(
//         `
// SELECT *
// FROM users
//     `
//       )
//       .then((res) => res.rows.map((row) => row.table_name))
//   );
// };
// setInterval(logUsers, 1000);

const resetDb = async (databaseStatus) => {
  try {
    // await axios.get('graphql-engine:8080/healthz', {
    //   timeout: 10,
    // });
    await resetSchema(db);
    const tables = await getTables();
    await setupHasura(tables);
    // await seedUsers();
    getFkInDatabase();
    databaseStatus.active = true;
  } catch {
    process.exit(1);
  }
};

module.exports = resetDb;
