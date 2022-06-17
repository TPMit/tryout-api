'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bacaQuran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      bacaQuran.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      bacaQuran.hasMany(models.jawabanBacaQurans,{
        foreignKey:'id'
      })

    }
  };
  bacaQuran.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bacaQuran',
  });
  return bacaQuran;
};
