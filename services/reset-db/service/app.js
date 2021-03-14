const resetDb = require('./database/resetDb');
const express = require('express');
// const path = require('path')
// const cookieParser = require('cookie-parser')
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

const databaseStatus = { active: false };

resetDb(databaseStatus);

app.get('/reset', async (req, res, next) => {
  databaseStatus.active = false;
  await resetDb(databaseStatus);
  res.json(databaseStatus);
});
app.get('/', async (req, res, next) => {
  res.json(databaseStatus);
});
module.exports = app;
