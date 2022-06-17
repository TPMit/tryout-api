'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gurus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      gurus.belongsTo(models.sekolahs,{
        foreignKey:'id_sekolah'
      });

      gurus.hasMany(models.tryouts,{
        foreignKey: 'id_guru'
      });

    }
  };
  gurus.init({
    nama: DataTypes.STRING,
    id_sekolah: DataTypes.INTEGER,
    nip: DataTypes.INTEGER,
    email:{
      type: DataTypes.STRING,
      unique: true,
    },
    phone: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    picture: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'gurus',
  });
  return gurus;
};