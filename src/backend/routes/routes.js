const express = require('express');
const { users, generateToken } = require('../auth/auth'); // Chemin mis à jour
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

// Route pour /hey
router.get('/hey', (req, res) => {
    res.send('hey');
});

// Route pour /login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).send(info.message);
        
        const token = generateToken(user);
        res.send({ token });
    })(req, res, next);
});

// Route pour /register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    res.send('Utilisateur enregistré');
});

module.exports = router;