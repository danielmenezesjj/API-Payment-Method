'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Produtos', 'deletedAt', {
      type: Sequelize.STRING,
      allowNull: true // Ou false, dependendo da sua necessidade
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Produtos', 'deletedAt');
  }
};