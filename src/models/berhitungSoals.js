'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class berhitungSoals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      berhitungSoals.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      berhitungSoals.hasMany(models.jawabanBerhitungSoals,{
        foreignKey:'id'
      })

    }
  };
  berhitungSoals.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
    waktu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'berhitungSoals',
  });
  return berhitungSoals;
};
