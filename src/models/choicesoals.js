'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class choicesoals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      choicesoals.belongsTo(models.soals,{
        foreignKey:'id_soal'
      })
    }
  };
  choicesoals.init({
    choice: DataTypes.STRING,
    id_soal: DataTypes.INTEGER,
    isTrue: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'choicesoals',
  });
  return choicesoals;
};
