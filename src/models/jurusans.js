'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jurusans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jurusans.belongsTo(models.jenjangs,{
        foreignKey:'id_jenjang'
      })
    }
  };
  jurusans.init({
    id_jenjang : DataTypes.INTEGER,
    jurusan : DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jurusans',
  });
  return jurusans;
};
