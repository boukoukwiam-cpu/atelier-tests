
jest.mock('../../src/mailer', () => ({
  envoyer: jest.fn().mockResolvedValue(true)
}));

const { validerCommande } = require('../../src/commande');
const mailer = require('../../src/mailer');

describe('validerCommande()', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('valide une commande et envoie un email', async () => {
    const items = [{ prix: 10, qte: 2 }];

    const resultat = await validerCommande(items, 'test@gmail.com');

    expect(resultat.montant).toBe(20);
    expect(mailer.envoyer).toHaveBeenCalledTimes(1);
    expect(mailer.envoyer).toHaveBeenCalledWith(
      'test@gmail.com',
      'Commande validée : 20 €'
    );
  });

  test('refuse un panier vide', async () => {
    await expect(
      validerCommande([], 'test@gmail.com')
    ).rejects.toThrow('Panier vide');

    expect(mailer.envoyer).not.toHaveBeenCalled();
  });

});
