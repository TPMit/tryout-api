'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class areas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            areas.hasMany(models.sekolahs, {
                foreignKey: 'id_area'
            })

            areas.belongsTo(models.indonesia_provinces, {
                foreignKey: 'province_id'
            })

        }
    };
    areas.init({
        province_id: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
        area: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'areas',
    });
    return areas;
};