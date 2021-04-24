'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repositorios = sequelize.define('Repositorios', {
    nome: DataTypes.STRING,
    description: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    slug: DataTypes.STRING
  }, {});
  Repositorios.associate = function(models) {
    
    Repositorios.hasMany(models.Stars, 
      {foreignKey: 'nome_id'
    })

    Repositorios.belongsTo(models.Users, 
      {foreignKey: 'username_id'
    })


  };
  return Repositorios;
};