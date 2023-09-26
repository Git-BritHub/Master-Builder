const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// await sequelize.sync({ force: true });

if (process.env.JAWSDB_URL) {
    // JAWSDB_URL for Heroku and a different one for railway
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;