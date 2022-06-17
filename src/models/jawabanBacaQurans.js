'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanBacaQurans extends Model {
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
      jawabanBacaQurans.belongsTo(models.bacaQuran,{
        foreignKey:'id_soal'
      })
      jawabanBacaQurans.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanBacaQurans.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanBacaQuran: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanBacaQurans',
  });
  return jawabanBacaQurans;
};
