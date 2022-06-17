'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanHafalanJuzs extends Model {
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
      jawabanHafalanJuzs.belongsTo(models.hafalanJuz,{
        foreignKey:'id_soal'
      })
      jawabanHafalanJuzs.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanHafalanJuzs.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanHafalanJuz: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanHafalanJuzs',
  });
  return jawabanHafalanJuzs;
};
