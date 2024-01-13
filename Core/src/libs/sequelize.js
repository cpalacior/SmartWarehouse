const { Sequelize } = require('sequelize');
const setupModels = require('../database/index_postgress');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgresql',
        logging: false // Cambiar a false cuando se hacen pruebas unitarias para evitar mensajes molestos
    }
);

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize;