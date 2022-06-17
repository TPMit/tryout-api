'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imlaKecils extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      imlaKecils.belongsTo(models.imlaKecils,{
        foreignKey:'id_imlaDetail'
      })
      imlaKecils.belongsTo(models.imlaDetails,{
        foreignKey:'id_imlaDetail'
      })
    }
  };
  imlaKecils.init({
    id_imlaDetail: DataTypes.INTEGER,
    soal : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'imlaKecils',
  });
  return imlaKecils;
};
