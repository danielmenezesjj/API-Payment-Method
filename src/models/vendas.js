'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendas extends Model {
    static associate(models) {
      Vendas.belongsTo(models.Users, {
        foreignKey: 'id_usuario',
      });
      Vendas.belongsTo(models.Produtos, {
        foreignKey: 'id_produto',
      });
    }
  }
  
  Vendas.init({
    id_usuario: DataTypes.INTEGER,
    id_produto: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vendas',
  });
  
  return Vendas;
};
