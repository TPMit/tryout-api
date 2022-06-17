'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hafalanJuz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hafalanJuz.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      hafalanJuz.hasMany(models.jawabanHafalanJuzs,{
        foreignKey:'id'
      })

    }
  };
  hafalanJuz.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hafalanJuz',
  });
  return hafalanJuz;
};
