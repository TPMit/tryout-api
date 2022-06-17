'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_tokens = sequelize.define('user_tokens', {
    userId: DataTypes.INTEGER,
    token: DataTypes.TEXT,
    expired: DataTypes.STRING
  }, {});
  user_tokens.associate = function(models) {
    // associations can be defined here
  };
  return user_tokens;
};