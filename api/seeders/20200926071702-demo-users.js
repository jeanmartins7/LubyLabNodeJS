'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        nome: 'Jean Martins',
        email: 'martinsj@alunos.utfpr.edu.br',
        localizacao: 'campinas-sp',
        avatar: 'https://avatars0.githubusercontent.com/u/43588549',
        bio: 'Engenharia mecânica UTFPR',
        username: 'jeanmarcel',
        createdAt: new Date(),
        updatedAt: new Date()

      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
   }
};
