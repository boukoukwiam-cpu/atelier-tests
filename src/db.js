
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'test',
  password: 'test',
  database: 'testdb'
});

module.exports = pool;
