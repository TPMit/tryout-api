'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class murids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      murids.belongsTo(models.sekolahs,{
        foreignKey:'id_sekolah'
      })

      murids.hasMany(models.bayars,{
        foreignKey:'id_murid'
      })

      murids.hasMany(models.daftars,{
        foreignKey:'id_murid'
      })

      murids.hasMany(models.tryouts,{
        foreignKey: 'id_murid'
      })

    }
  };
  murids.init({
    name: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    phone: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    kelamin: DataTypes.STRING,
    alamat: DataTypes.STRING,
    id_sekolah: DataTypes.STRING,
    picture: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'murids',
  });
  return murids;
};