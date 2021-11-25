'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PortfolioEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolioId: {
        allowNull: false,
        references: { model: "Portfolios" },
        onDelete: "CASCADE",
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      symbolName: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.DECIMAL,
      },
      change: {
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PortfolioEntries');
  }
};
