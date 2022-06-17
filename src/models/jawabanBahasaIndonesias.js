'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanBahasaIndonesias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // bacaQuran.belongsTo(models.pakets,{
      //   foreignKey:'id_paketPondok'
      // })
      jawabanBahasaIndonesias.belongsTo(models.bahasaIndonesias,{
        foreignKey:'id_soal'
      })
      jawabanBahasaIndonesias.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanBahasaIndonesias.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanBahasaIndonesia: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanBahasaIndonesias',
  });
  return jawabanBahasaIndonesias;
};
