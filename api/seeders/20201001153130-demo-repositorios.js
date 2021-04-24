'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Repositorios', [{
      nome: 'Desafio Luby',
      description:'',
      username_id: 'jeanmartins7',
      public: 0,
      slug:'jeanmartins7-Desafio-Luby',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Repositorios', null, {});
  }
};
