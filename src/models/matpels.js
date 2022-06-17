'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matpels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      matpels.hasMany(models.soals,{
        foreignKey: 'id_matpel'
      })

      matpels.belongsTo(models.jenjangs,{
        foreignKey:'id_jenjang'
      })

      matpels.hasMany(models.soalTypes,{
        foreignKey:'id_matpel'
      })

    }
  };
  matpels.init({
    nama: DataTypes.STRING,
    id_jenjang: DataTypes.INTEGER,
    id_type: DataTypes.INTEGER,
    jumlah_soal: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'matpels',
  });
  return matpels;
};
