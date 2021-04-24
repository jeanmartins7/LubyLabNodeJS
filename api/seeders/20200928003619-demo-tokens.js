'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tokens', [{
      username_id: 'jeanmartins7',
      data_acesso: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tokens', null, {});
  }
};
