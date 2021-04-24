'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stars', [{
      nome_id: 'Desafio Luby',
      username_id: 'jeanmartins7',
      count: 1,
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stars', null, {});
  }
};
