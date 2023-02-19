'use strict';

const data = [
  {
    name: 'My First Portfolio',
    userId: 1,
    startingFunds: '100000.00',
    currentFunds: '100000.00',
    value: 0.00,
    change: 0.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Portfolios', data, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Portfolios', null, {});
  }
};
