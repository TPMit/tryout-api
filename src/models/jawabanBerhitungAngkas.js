'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanBerhitungAngkas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      jawabanBerhitungAngkas.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })
      jawabanBerhitungAngkas.belongsTo(models.berhitungAngkas,{
        foreignKey:'id_soal'
      })

    }
  };
  jawabanBerhitungAngkas.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanBerhitungAngka: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanBerhitungAngkas',
  });
  return jawabanBerhitungAngkas;
};
