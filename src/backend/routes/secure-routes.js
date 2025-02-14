const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();
let testVariable = 'test';

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401); // Non autorisé

    jwt.verify(token, 'votre_secret', (err, user) => {
        if (err) return res.sendStatus(403); // Interdit
        req.user = user;
        next();
    });
};

// Routes protégées
router.post('/calcul', authenticateToken, (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case 'addition':
            result = num1 + num2;
            break;
        case 'soustraction':
            result = num1 - num2;
            break;
        case 'multiplication':
            result = num1 * num2;
            break;
        case 'division':
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Opération non valide');
    }

    res.send({ result });
});

// Route pour /constante
router.get('/constante', authenticateToken, (req, res) => {
    const constante = 'Ceci est une constante';
    res.json({ constante });
});

// Route pour /prol
router.post('/prol', authenticateToken, (req, res) => {
    const { chaine } = req.body;
    testVariable += chaine;
    res.json({ testVariable });
});

// Route pour /delete
router.delete('/delete', authenticateToken, (req, res) => {
    testVariable = '';
    res.json({ message: 'Contenu supprimé' });
});

// Route pour /file
router.post('/file', authenticateToken, (req, res) => {
    const { fichier } = req.body;
    fs.writeFile(`./${fichier}`, 'Contenu du fichier', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'écriture du fichier' });
        }
        res.json({ message: 'Fichier enregistré' });
    });
});

module.exports = router; 