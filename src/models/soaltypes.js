'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soalTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      soalTypes.hasMany(models.soals,{
        foreignKey: 'id_type'
      })

      soalTypes.belongsTo(models.matpels,{
        foreignKey: 'id_matpel'
      })

    }
  };
  soalTypes.init({
    type: DataTypes.STRING,
    id_matpel: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'soalTypes',
  });
  return soalTypes;
};
