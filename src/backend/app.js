const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/auth'); // Importer le fichier d'authentification
const routes = require('./routes/routes'); // Importer les routes
const secureRoutes = require('./routes/secure-routes'); // Importer les routes sécurisées
const sequelize = require('./config/database'); // Importer la connexion à la base de données

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(passport.initialize());
// Utiliser les routes
app.use('/', routes); 
app.use('/', secureRoutes); // Ajouter les routes sécurisées

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
