require('dotenv-flow').config();

const config = {
    dev: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DBDialect,
    max: process.env.MAX,
    min: process.env.MIN,
    acquire: process.env.ACQUIRE,
    idle: process.env.IDLE
}

module.exports = { config };
