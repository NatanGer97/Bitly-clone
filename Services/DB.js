const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('bitly', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: "postgres",
    port: 5432,
    
  });



exports.sequelize = sequelize;