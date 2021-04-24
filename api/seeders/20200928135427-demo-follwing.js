module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followings', [{
      username_id: 'jeanmartins7',
      following: 'bachega8',
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      username_id: 'jeanmartins7',
      following: 'lucasbachega',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followings', null, {});
  }
};

