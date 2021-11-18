'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Portfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      userId: {
        references: { model: "Users" },
        type: Sequelize.INTEGER
      },
      startingFunds: {
        type: Sequelize.DECIMAL
      },
      currentFunds: {
        type: Sequelize.DECIMAL
      },
      plYTD: {
        type: Sequelize.DECIMAL
      },
      plMonth: {
        type: Sequelize.DECIMAL
      },
      plDay: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Portfolios');
  }
};
