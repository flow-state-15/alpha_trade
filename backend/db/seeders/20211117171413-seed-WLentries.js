'use strict';

const data = [
  {
    watchlistId: 1,
    symbol: 'AAPL',
    symbolName: 'Apple',
    currentPrice: 0.00,
    sessionStartPrice: 0.00,
    prevSessionClose: 0.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    watchlistId: 1,
    symbol: 'AAPL',
    symbolName: 'Apple',
    currentPrice: 0.00,
    sessionStartPrice: 0.00,
    prevSessionClose: 0.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('WatchlistEntries', data, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('WatchlistEntries', null, {});
  }
};
