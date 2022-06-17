'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanBerhitungSoals extends Model {
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
      jawabanBerhitungSoals.belongsTo(models.berhitungSoals,{
        foreignKey:'id_soal'
      })
      jawabanBerhitungSoals.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanBerhitungSoals.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanBerhitungSoal: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanBerhitungSoals',
  });
  return jawabanBerhitungSoals;
};
