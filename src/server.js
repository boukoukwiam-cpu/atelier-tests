
const express = require('express');
const { validerCommande } = require('./commande');

const app = express();

app.use(express.json());

// Afficher les pages HTML du dossier public
app.use(express.static(require('path').join(__dirname, '..', 'public')));

// Route de verification
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
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
        res.status(400).json({ error: error.message });
    }
});

// Route de connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'a@test.fr' && password === 'secret') {
        return res.sendStatus(200);
    }

    return res.sendStatus(401);
});

module.exports = app;

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Serveur demarre sur le port 3000');
    });
}
