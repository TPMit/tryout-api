'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailPondoks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      detailPondoks.belongsTo(models.tryouts,{
        foreignKey: 'id_tryout'
      })

      detailPondoks.hasMany(models.jawabanPsikotes,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanBacaQurans,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanBahasaIndonesias,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanBerhitungAngkas,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanBerhitungSoals,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanHafalanJuzs,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanHukumTajwids,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanImlas,{
        foreignKey: 'idDetailPondok'
      })
      detailPondoks.hasMany(models.jawabanPraktekIbadahs,{
        foreignKey: 'idDetailPondok'
      })
      // detailPondok.belongsTo(models.murids,{
      //   foreignKey: 'id_murid'
      // })
      //
      // detailPondok.belongsTo(models.gurus,{
      //   foreignKey: 'id_guru'
      // })
      //
      // detailPondok.hasMany(models.tryoutDetails,{
      //   foreignKey: 'id_tryout'
      // })
      //
      // detailPondok.belongsTo(models.pakets,{
      //   foreignKey: 'id_paket'
      // })
      //
      // detailPondok.belongsTo(models.jenjangs, {
      //   foreignKey: 'jenjang',
      //   as: 'tingkat', // Changes applied here
      //   onDelete: 'CASCADE',
      // })

    }
  };
  detailPondoks.init({
    code_akses: DataTypes.STRING,
    id_murid: DataTypes.INTEGER,
    namaSoal: DataTypes.STRING,
    tgl: DataTypes.DATE,
    statusKoreksi: DataTypes.BOOLEAN,
    id_paketPondok: DataTypes.INTEGER,
    id_tryout: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    statusKoreksi : DataTypes.BOOLEAN,
    point: DataTypes.INTEGER,
    urutan : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'detailPondoks',
  });
  return detailPondoks;
};
