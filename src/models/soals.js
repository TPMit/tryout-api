'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      soals.hasMany(models.choicesoals,{
        foreignKey: 'id_soal'
      });

      soals.belongsTo(models.soalTypes,{
        foreignKey:'id_type'
      });

      soals.belongsTo(models.matpels,{
        foreignKey: 'id_matpel'
      });

    }
  };
  soals.init({
    soals: DataTypes.STRING,
    id_type: DataTypes.INTEGER,
    id_matpel: DataTypes.INTEGER,
    jawaban: DataTypes.STRING,
    isEssay: DataTypes.INTEGER,
    pembahasan: DataTypes.BLOB,
    imgPembahasan: DataTypes.BOOLEAN,
    id_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'soals',
  });
  return soals;
};
