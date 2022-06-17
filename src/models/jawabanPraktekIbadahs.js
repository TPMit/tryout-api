'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanPraktekIbadahs extends Model {
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
      jawabanPraktekIbadahs.belongsTo(models.praktekIbadah,{
        foreignKey:'id_soal'
      })
      jawabanPraktekIbadahs.belongsTo(models.detailPondoks,{
        foreignKey: 'id'
      })

    }
  };
  jawabanPraktekIbadahs.init({
    idDetailPondok: DataTypes.INTEGER,
    id_soal : DataTypes.INTEGER,
    jawabanPraktekIbadah: DataTypes.STRING,
    jawaban_user  : DataTypes.STRING,
    status : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jawabanPraktekIbadahs',
  });
  return jawabanPraktekIbadahs;
};
