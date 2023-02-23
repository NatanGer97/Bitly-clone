const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('bitly', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: "postgres",
    port: 5432,
    
  });

// const sequelize = new Sequelize('bitly', 'postgres', 'postgres', {dialect: 'postgres', host: 'postgres', port: 5432});



exports.sequelize = sequelize;