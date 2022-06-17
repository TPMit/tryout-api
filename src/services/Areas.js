// @ts-nocheck

const Provinsi = require("@models").indonesia_provinces;
const Area = require("@models").areas;
const db = require("@models");
class Areas {
    constructor() {}


    getArea(body) {
        const { id_provinsi } = body;
        var kondisi = {}
        if (id_provinsi != "" && id_provinsi != null && id_provinsi != 0 && id_provinsi != "0") {
            kondisi.province_id = id_provinsi
        }
        return new Promise(function(resolve, reject) {
            Area.findAll({ where: kondisi })
                .then((area) => {
                    resolve(area)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    getProvinsi() {
        return new Promise(function(resolve, reject) {
            Provinsi.findAll()
                .then((area) => {
                    resolve(area)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    newArea(body) {
        console.log(body)
        let { areas } = body
        areas = areas.map((item) => {
            return { area: item, active: true }
        })
        return new Promise(function(resolve, reject) {
            Area.bulkCreate(areas, {
                    returning: true
                })
                .then((result) => {
                    if (result) {
                        resolve("Success Added New Area")
                    } else {
                        reject("Failed Added New Area")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }
    UpdateArea(id, body) {
        const { area } = body
        return new Promise(function(resolve, reject) {
            Area.findOne({
                    where: { id: id }
                })
                .then((found) => {
                    found.update({ area: area })
                    resolve("Success Update Area")
                })
                .then((updated) => {
                    if (updated) {
                        resolve("Success Update Area")
                    } else {
                        reject("Failed Update Area")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }
    delete(id) {
        return new Promise(function(resolve, reject) {
            Area.destroy({
                    where: { id: id }
                })
                .then((result) => {
                    resolve(Boolean(parseInt(result.toString())))
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    report() {
        return new Promise(function(resolve, reject) {
            let sql = `select tryout.areas.area,(select count(tryout.murids.id) from tryout.murids inner join tryout.sekolahs on tryout.sekolahs.id = tryout.murids.id_sekolah where tryout.sekolahs.id_area = tryout.areas.id) as murid from tryout.areas;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }

    fetchCondition(conditions) {
        return new Promise(function(resolve, reject) {
            var NewConditions = {};
            if (conditions.id_provinsi) {
                NewConditions.id_provinsi = conditions.id_provinsi
            }
            resolve(NewConditions)
        })
    }
}

module.exports = Areas;
