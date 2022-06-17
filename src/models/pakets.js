'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pakets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pakets.hasMany(models.tryouts,{
        foreignKey:'id_paket'
      })
    }
  };
  pakets.init({
    nama_paket: DataTypes.STRING,
    waktu_pengerjaan: DataTypes.STRING,
    tanggal_selesai: DataTypes.STRING,
    isPondok : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pakets',
  });
  return pakets;
};
