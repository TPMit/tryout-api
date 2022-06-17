'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hargas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hargas.belongsTo(models.skemaHargas,{
        foreignKey: 'id_skema'
      });

    }
  };
  hargas.init({
    harga: DataTypes.INTEGER,
    id_skema: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hargas',
  });
  return hargas;
};
