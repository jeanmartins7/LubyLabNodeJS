'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    data_acesso: DataTypes.DATEONLY
  }, {});
  Tokens.associate = function(models) {
    Tokens.belongsTo(models.Users, 
      {foreignKey: 'username_id'});
  };
  return Tokens;
};