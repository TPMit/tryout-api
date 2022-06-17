'use strict';

const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    verify: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
    level: DataTypes.STRING
  },
  {
    hooks: {
      /*beforeValidate: function(user, options) {
      return user.name = 'happy'
    },*/
      afterValidate: function (user, options) {
        var date = new Date();
        var current_hour = date.getMinutes() + date.getSeconds();
        return (user.name = current_hour);
      },
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

  users.prototype.comparePassword = async function (passw, cb) {
    await bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.rooms,{
      foreignKey:'userId'
    })
  };
  return users;
};