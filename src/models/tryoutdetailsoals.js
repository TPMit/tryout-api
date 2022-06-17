'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tryoutDetailSoals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      tryoutDetailSoals.belongsTo(models.soals,{
        foreignKey: 'id_soal'
      })

      tryoutDetailSoals.belongsTo(models.tryoutDetails,{
        foreignKey: 'id_tryoutDetail'
      })
      
    }
  };
  tryoutDetailSoals.init({
    id_tryoutDetail: DataTypes.INTEGER,
    id_soal: DataTypes.INTEGER,
    jawaban_user: DataTypes.STRING,
    jawaban_benar: DataTypes.STRING,
    filename: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tryoutDetailSoals',
  });
  return tryoutDetailSoals;
};