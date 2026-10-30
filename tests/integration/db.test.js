
const pool = require('../../src/db');

describe('Tests d integration PostgreSQL', () => {

  test('verifie la connexion a PostgreSQL', async () => {
    const result = await pool.query('SELECT 1 AS resultat');

    expect(result.rows[0].resultat).toBe(1);
  });

  test('verifie le nom de la base de donnees', async () => {
    const result = await pool.query('SELECT current_database()');

    expect(result.rows[0].current_database).toBe('testdb');
  });

  afterAll(async () => {
    await pool.end();
  });

});
