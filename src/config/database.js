const { Sequelize } = require('sequelize');

const isTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize({
    dialect: isTest ? 'sqlite' : process.env.DB_DIALECT || 'postgres',
    storage: isTest ? ':memory:' : undefined,
    host: isTest ? undefined : process.env.DB_HOST || 'localhost',
    port: isTest ? undefined : process.env.DB_PORT || 5432,
    database: isTest ? undefined : process.env.DB_NAME || 'microservicio_db',
    username: isTest ? undefined : process.env.DB_USERNAME || 'postgres',
    password: isTest ? undefined : process.env.DB_PASSWORD || '',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    sequelize,
    Sequelize
};