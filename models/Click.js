const {sequelize} = require('../Services/DB');
const {DataTypes} = require('sequelize');

const Click = sequelize.define('clicks', {
    shortUrl: {type: DataTypes.STRING, allowNull: false},
    longUrl: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false },
    clickedAt: {type: DataTypes.DATEONLY, allowNull: false},
    
});

module.exports = Click;