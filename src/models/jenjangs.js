'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenjangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jenjangs.hasMany(models.matpels,{
        foreignKey: 'id_jenjang'
      });
      jenjangs.hasMany(models.jurusans,{
        foreignKey: 'id_jenjang'
      });
      jenjangs.hasMany(models.tryouts, {
        foreignKey: 'jenjang',
        as: 'tingkat', // Changes applied here
        onDelete: 'CASCADE',
      });
    }
  };
  jenjangs.init({
    jenjang : DataTypes.STRING,
    icon : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'jenjangs',
  });
  return jenjangs;
};
