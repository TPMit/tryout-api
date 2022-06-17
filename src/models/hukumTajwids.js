'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hukumTajwids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      hukumTajwids.belongsTo(models.pakets,{
        foreignKey:'id_paketPondok'
      })
      hukumTajwids.hasMany(models.jawabanHukumTajwids,{
        foreignKey:'id'
      })

    }
  };
  hukumTajwids.init({
    id_paketPondok: DataTypes.INTEGER,
    soal : DataTypes.STRING,
    kunciJawaban: DataTypes.STRING,
    pembahasan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'hukumTajwids',
  });
  return hukumTajwids;
};
