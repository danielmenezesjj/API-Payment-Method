'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Vendas, {
        foreignKey: 'id_usuario',
      });
    }
  }
  
  Users.init({
    nomeUser: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    creditos: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Users',
  });
  
  return Users;
};
