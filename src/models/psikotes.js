'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class psikotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      psikotes.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      psikotes.hasMany(models.jawabanPsikotes,{
        foreignKey:'id'
      })

    }
  };
  psikotes.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'psikotes',
  });
  return psikotes;
};
