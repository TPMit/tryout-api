'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bahasaIndonesias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bahasaIndonesias.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      bahasaIndonesias.hasMany(models.jawabanBahasaIndonesias,{
        foreignKey:'id'
      })

    }
  };
  bahasaIndonesias.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
    waktu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bahasaIndonesias',
  });
  return bahasaIndonesias;
};
