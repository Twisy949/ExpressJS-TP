const { Sequelize } = require('sequelize'); // Importer Sequelize

// Créer une instance de Sequelize pour la connexion à la base de données
const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


// Vérifier la connexion
sequelize.authenticate().then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

module.exports = sequelize; // Exporter l'instance de Sequelize 