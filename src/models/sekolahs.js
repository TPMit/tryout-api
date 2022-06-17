'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sekolahs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      sekolahs.belongsTo(models.areas,{
        foreignKey:'id_area'
      })

      sekolahs.hasMany(models.murids,{
        foreignKey:'id_sekolah'
      })

      sekolahs.hasMany(models.daftars,{
        foreignKey:'id_sekolah_tujuan'
      })

      sekolahs.hasMany(models.gurus,{
        foreignKey:'id_sekolah'
      })

    }
  };
  sekolahs.init({
    nama: DataTypes.STRING,
    id_area: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    kkm: DataTypes.INTEGER,
    id_jenjang : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sekolahs',
  });
  return sekolahs;
};
