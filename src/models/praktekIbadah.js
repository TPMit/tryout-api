'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class praktekIbadah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      praktekIbadah.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      praktekIbadah.hasMany(models.jawabanPraktekIbadahs,{
        foreignKey:'id'
      })

    }
  };
  praktekIbadah.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    statusSoal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'praktekIbadah',
  });
  return praktekIbadah;
};
