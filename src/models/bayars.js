'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bayars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bayars.belongsTo(models.murids,{
        foreignKey:'id_murid'
      })

    }
  };
  bayars.init({
    transaction_id : DataTypes.STRING,
    va_number : DataTypes.STRING,
    payment_type : DataTypes.STRING,
    batas_waktu : DataTypes.DATE,
    id_murid: DataTypes.INTEGER,
    metode_pembayaran: DataTypes.STRING,
    jumlah: DataTypes.STRING,
    tgl: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    id_tryout: DataTypes.INTEGER,
    qrcode: DataTypes.STRING,
    deeplink: DataTypes.STRING,
    status_gopay: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bayars',
  });
  return bayars;
};
