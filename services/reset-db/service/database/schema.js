const resetSchema = (db) => {
  return db.query(`
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL);
`)
}

module.exports = { resetSchema }
