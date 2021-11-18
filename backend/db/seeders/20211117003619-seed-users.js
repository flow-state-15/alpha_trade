'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

// const data = [
//   {
//     email: 'dougdemo@demodome.io',
//     hashedPassword: bcrypt.hashSync('password'),
//   },
// ]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert("Users", [
    {
      email: "dougdemo@demodome.io",
      hashedPassword: bcrypt.hashSync("password"),
      lastViewedSym: "AAPL",
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
