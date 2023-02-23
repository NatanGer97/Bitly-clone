const {sequelize} = require('../Services/DB');
const {DataTypes} = require('sequelize');

const Click = sequelize.define('clicks', {
    shortUrl: {type: DataTypes.STRING, allowNull: false},
    longUrl: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false },
    createdAt: {type: DataTypes.DATE, allowNull: false},
});

module.exports = Click;