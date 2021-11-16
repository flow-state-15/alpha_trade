'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WatchlistEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      watchlistId: {
        allowNull: false,
        references: { model: "Watchlists" },
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      symbol: {
        type: Sequelize.STRING
      },
      symbolName: {
        type: Sequelize.STRING
      },
      currentPrice: {
        type: Sequelize.DECIMAL
      },
      sessionStartPrice: {
        type: Sequelize.DECIMAL
      },
      prevSessionClose: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WatchlistEntries');
  }
};
