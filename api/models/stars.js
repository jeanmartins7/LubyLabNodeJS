'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stars = sequelize.define('Stars', {
    count: DataTypes.INTEGER
  }, {});
  Stars.associate = function(models) {
    Stars.belongsTo(models.Users, 
      {foreignKey: 'username_id'
    })
    Stars.belongsTo(models.Repositorios, 
      {foreignKey: 'nome_id'
    })
  };
  return Stars;
};