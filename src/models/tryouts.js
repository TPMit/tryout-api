'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tryouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tryouts.belongsTo(models.murids,{
        foreignKey: 'id_murid'
      })

      tryouts.belongsTo(models.gurus,{
        foreignKey: 'id_guru'
      })

      tryouts.hasMany(models.tryoutDetails,{
        foreignKey: 'id_tryout'
      })

      tryouts.hasMany(models.detailPondoks,{
        foreignKey: 'id_tryout'
      })

      tryouts.belongsTo(models.pakets,{
        foreignKey: 'id_paket'
      })

      tryouts.belongsTo(models.jenjangs, {
        foreignKey: 'jenjang',
        as: 'tingkat', // Changes applied here
        onDelete: 'CASCADE',
      })

    }
  };
  tryouts.init({
    code_akses: DataTypes.STRING,
    id_murid: DataTypes.INTEGER,
    id_guru: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    jenjang: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    statusKoreksi : DataTypes.INTEGER,
    idSekolahTujuan : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tryouts',
  });
  return tryouts;
};
