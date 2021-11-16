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
      currentPrice: {
        type: Sequelize.DECIMAL
      },
      expires: {
        type: Sequelize.DATE
      },
      impVol: {
        type: Sequelize.DECIMAL
      },
      delta: {
        type: Sequelize.DECIMAL
      },
      theta: {
        type: Sequelize.DECIMAL
      },
      gamma: {
        type: Sequelize.DECIMAL
      },
      rho: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PortfolioEntries');
  }
};
