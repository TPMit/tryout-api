'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tryoutDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tryoutDetails.belongsTo(models.matpels,{
        foreignKey: 'id_matpel'
      })

      tryoutDetails.belongsTo(models.tryouts,{
        foreignKey: 'id_tryout'
      })

      tryoutDetails.hasMany(models.tryoutDetailSoals,{
        foreignKey: 'id_tryoutDetail'
      })

    }
  };
  tryoutDetails.init({
    id_tryout: DataTypes.INTEGER,
    id_matpel: DataTypes.INTEGER,
    nilai: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    statusKoreksi: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'tryoutDetails',
  });
  return tryoutDetails;
};
