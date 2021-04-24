'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username_id: {
        allowNull: false,
        type: Sequelize.STRING,
        reference: { model: 'Users', key: 'username'}
      },
      nome_id: {
        allowNull: false,
        type: Sequelize.STRING,
        reference: { model: 'Repositorio', key: 'nome'}
      },
      count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stars');
  }
};