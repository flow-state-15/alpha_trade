'use strict';

const data = [
  {
    name: 'S&P100',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'QQQ',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Watchlists', data, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Watchlists', null, {});
  }
};
