const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// await sequelize.sync({ force: true });

if (process.env.MYSQL_URL) {
    // MYSQL_URL for railway database connection
    sequelize = new Sequelize(process.env.MYSQL_URL);
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