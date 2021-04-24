'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    follower: DataTypes.STRING
  }, {});
  Followers.associate = function(models) {
    Followers.belongsTo(models.Users, 
      {foreignKey: 'username_id'
    });
  };
  return Followers;
};