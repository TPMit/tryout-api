'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imlaDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      imlaDetails.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      // imlaDetails.hasMany(models.imlaKecils,{
      //   foreignKey:'id_imlaDetail'
      // })
      imlaDetails.hasMany(models.jawabanImlas,{
        foreignKey:'id'
      })
    }
  };
  imlaDetails.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    soal_dua: DataTypes.STRING,
    soal_tiga: DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'imlaDetails',
  });
  return imlaDetails;
};
