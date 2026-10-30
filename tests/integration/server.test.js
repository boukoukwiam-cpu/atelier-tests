
const request = require('supertest');
const app = require('../../src/server');

jest.mock('../../src/mailer', () => ({
  envoyer: jest.fn().mockResolvedValue(undefined)
}));

describe('Tests API avec Supertest', () => {

  test('GET /health retourne OK', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('POST /commandes valide une commande', async () => {
    const response = await request(app)
      .post('/commandes')
      .send({
        items: [
          { prix: 10, qte: 2 }
        ],
        email: 'test@example.com'
      });

    expect(response.status).toBe(201);
    expect(response.body.montant).toBe(20);
    expect(response.body.message).toBe('Commande validee');
  });

  test('POST /commandes refuse un panier vide', async () => {
    const response = await request(app)
      .post('/commandes')
      .send({
        items: [],
        email: 'test@example.com'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Panier vide');
  });

});
