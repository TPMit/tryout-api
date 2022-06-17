'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    expired: DataTypes.DATE,
    opened: DataTypes.INTEGER
  }, {});
  rooms.associate = function(models) {
    // associations can be defined here
    rooms.belongsTo(models.users, {
      foreignKey: 'userId',
    });
    rooms.hasMany(models.participants,{
      foreignKey:'roomId'
    })
    rooms.hasMany(models.fileShares,{
      foreignKey:'roomId'
    })
  };
  return rooms;
};