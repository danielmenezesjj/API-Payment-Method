'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    static associate(models) {
      Produtos.hasMany(models.Vendas, {
        foreignKey: 'id_produto',
      });
    }
  }
  
  Produtos.init({
    nomeDoProduto: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    dataDeValidade: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Produtos',
    paranoid: true,
    deletedAt: 'deletedAt',
  });
  
  return Produtos;
};
