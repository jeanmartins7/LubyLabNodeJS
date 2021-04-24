'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  Users.associate = function(models) {

    Users.hasMany(models.Tokens, 
      {foreignKey: 'username_id'
    })
    
    Users.hasMany(models.Followers, 
      {foreignKey: 'username_id'
    })

    Users.hasMany(models.Followings, 
      {foreignKey: 'username_id'
    })

    Users.hasMany(models.Repositorios, 
      {foreignKey: 'username_id'
    })

    Users.hasMany(models.Stars, 
      {foreignKey: 'username_id'
    })


  
  };
  return Users;
};