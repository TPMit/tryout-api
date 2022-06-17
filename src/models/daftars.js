'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daftars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      daftars.belongsTo(models.murids,{
        foreignKey:'id_murid'
      })

      daftars.belongsTo(models.sekolahs,{
        foreignKey:'id_sekolah_tujuan'
      })

    }
  };
  daftars.init({
    id_murid: DataTypes.INTEGER,
    id_sekolah_tujuan: DataTypes.INTEGER,
    tgl_daftar: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'daftars',
  });
  return daftars;
};