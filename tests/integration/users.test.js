const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

beforeEach(async () => {
  await db.query('DROP TABLE IF EXISTS users');

  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      nom TEXT NOT NULL
    )
  `);

  await db.query(
    "INSERT INTO users (nom) VALUES ('Alice')"
  );
});

afterAll(async () => {
  await db.end();
});

describe('Tests d’intégration API Users', () => {

  test('GET /users/1 retourne un utilisateur existant', async () => {
    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body.nom).toBe('Alice');
  });

  test('GET /users/abc retourne une erreur 400', async () => {
    const response = await request(app).get('/users/abc');

    expect(response.status).toBe(400);
    expect(response.body.erreur).toBe('id invalide');
  });

  test('GET /users/999 retourne une erreur 404', async () => {
    const response = await request(app).get('/users/999');

    expect(response.status).toBe(404);
    expect(response.body.erreur).toBe('introuvable');
  });

});