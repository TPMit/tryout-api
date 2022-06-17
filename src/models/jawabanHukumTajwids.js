'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanHukumTajwids extends Model {
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
      jawabanHukumTajwids.belongsTo(models.hukumTajwids,{
        foreignKey:'id_soal'
      })
      jawabanHukumTajwids.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanHukumTajwids.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanHukumTajwids: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanHukumTajwids',
  });
  return jawabanHukumTajwids;
};
