const express = require('express');
const path = require('path');
const { validerCommande } = require('./commande');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Vérification du serveur
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Validation des commandes
app.post('/commandes', async (req, res) => {
  try {
    const { items, email } = req.body;
    const resultat = await validerCommande(items, email);

    res.status(201).json({
      message: 'Commande validee',
      montant: resultat.montant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Authentification
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'a@test.fr' && password === 'secret') {
    return res.sendStatus(200);
  }

  return res.sendStatus(401);
});

// Récupération d'un utilisateur
app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erreur: 'id invalide' });
  }

  try {
    const { rows } = await db.query(
      'SELECT id, nom FROM users WHERE id = $1',
      [id]
    );

    if (!rows[0]) {
      return res.status(404).json({ erreur: 'introuvable' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

module.exports = app;