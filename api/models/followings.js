'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followings = sequelize.define('Followings', {
    following: DataTypes.STRING
  }, {});
  Followings.associate = function(models) {
    Followings.belongsTo(models.Users, 
      {foreignKey: 'username_id'
    })
  };
  return Followings;
};