'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanPsikotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      jawabanPsikotes.belongsTo(models.psikotes,{
        foreignKey:'id_soal'
      })
      jawabanPsikotes.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanPsikotes.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanPsikotes : DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanPsikotes',
  });
  return jawabanPsikotes;
};
