
const express = require('express');
const { validerCommande } = require('./commande');

const app = express();

app.use(express.json());

// Route de verification
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});

// Route de validation d'une commande
app.post('/commandes', async (req, res) => {
  try {
    const { items, email } = req.body;

    const resultat = await validerCommande(items, email);

    res.status(201).json({
      message: 'Commande validee',
      montant: resultat.montant
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = app;

// Demarrage du serveur
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Serveur demarre sur le port 3000');
  });
}
