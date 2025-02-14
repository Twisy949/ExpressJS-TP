const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [
    { username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' }, // Admin par défaut
]; // Pour stocker les utilisateurs en mémoire

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'Utilisateur non trouvé' });
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false, { message: 'Mot de passe incorrect' });
        return done(null, user);
    });
}));

const generateToken = (user) => {
    return jwt.sign({ id: user.username }, 'votre_secret', { expiresIn: '1h' });
};

module.exports = { users, generateToken }; 