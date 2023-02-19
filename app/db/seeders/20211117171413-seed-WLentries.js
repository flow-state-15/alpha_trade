'use strict';
const sp100 = require('./sp100.json')
const qqq = require('./qqq.json')


const data = [ ...sp100,...qqq ]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('WatchlistEntries', data, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('WatchlistEntries', null, {});
  }
};
