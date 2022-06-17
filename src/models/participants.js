'use strict';
module.exports = (sequelize, DataTypes) => {
  const participants = sequelize.define('participants', {
    roomId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    browser: DataTypes.STRING,
    ip: DataTypes.STRING
  }, {});
  participants.associate = function(models) {
    // associations can be defined here
    participants.belongsTo(models.rooms, {
      foreignKey: 'roomId',
    });
  };
  return participants;
};