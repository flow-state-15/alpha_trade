'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const data = [
  {
    email: 'dougdemo@demodome.io',
    hashedPassword: bcrypt.hashSync('password'),
  },
  {
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
  },
  {
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
