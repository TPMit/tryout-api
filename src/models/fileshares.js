'use strict';
module.exports = (sequelize, DataTypes) => {
  const fileShares = sequelize.define('fileShares', {
    roomId: DataTypes.INTEGER,
    filename: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  fileShares.associate = function(models) {
    // associations can be defined here
    fileShares.belongsTo(models.rooms, {
      foreignKey: 'roomId',
    });
  };
  return fileShares;
};