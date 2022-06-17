var fs = require('fs');
const Soal = require("@models").soals;
const Matpel = require("@models").matpels;
const Choice = require("@models").choicesoals;
const SoalType = require("@models").soalTypes;
const Jenjang = require("@models").jenjangs;
const TODS = require("@models").tryoutDetailSoals;
const TOD = require("@models").tryoutDetails;
const tryout = require("@models").tryouts;
const { Op } = require('sequelize');
class Soals {
    constructor() {}


    getSoal(conditions) {
        return new Promise(async function(resolve, reject) {

                this.fetchCondition(conditions)
                    .then((condition) => {
                        Soal.findAll({
                                where: condition,
                                offset: 0,
                                // limit : parseInt(conditions.limit),
                                order: [
                                    ["id", "ASC"]
                                ],
                                include: [{
                                    model: Choice,
                                    attributes: ["choice", "id_soal", "isTrue"]
                                }]
                            })
                            .then(async(soals) => {
                                if (soals) {
                                    resolve({
                                        data: soals
                                    })
                                } else {
                                    reject("Data Not Found")
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                    .catch(err => { reject })
            }.bind(this)) //
    }

    getSoalPaket(body) {
      const { id_matpel } = body;
      var kondisi = {}
      if (id_matpel != "" && id_matpel != null && id_matpel != 0 && id_matpel != "0") {
          kondisi.id_type = id_matpel
      }
      return new Promise(function(resolve, reject) {
        Soal.findAll({
          where: kondisi,
          include: [{
            model: SoalType,
            attributes: ["id", "type"],
          }],
        })
          .then((soal) => {
            soal = soal.map((item) => {
              return {
                idSoal: item.id,
                soals : item.soals,
                type  : item.soalType.type,
              }
            })
            resolve(soal)
          })
          .catch((err) => {
              reject(err)
          })
      })
    }

    getSoalFromTryout(id_murid = null, jenjang = null, lastInsertIdTryout = null) {
        return new Promise(async function(resolve, reject) {
            let tryouts = await tryout.findAll({
                order: [
                    ["id", "ASC"]
                ],
                where: [{
                    id_murid: id_murid
                }]
            });
            tryouts = tryouts.map((item) => item.id)
            let tod = await TOD.findAll({
                order: [
                    ["id", "ASC"]
                ],
                where: [{
                    id_tryout: tryouts
                }]
            });
            let id_tod = tod.map((item) => item.id)
            let tods = await TODS.findAll({
                order: [
                    ["id", "ASC"]
                ],
                where: {
                    id_tryoutDetail: id_tod
                }
            });
            tods = tods.map((item) => item.id_soal)
            Jenjang.findAll({
                    where: { id: jenjang },
                    order: [
                        ["id", "ASC"]
                    ],
                    include: [{
                        model: Matpel,
                        attributes: ["id", "nama", "id_jenjang"],
                        include: [{
                            model: SoalType,
                            attributes: ["id", "type"],
                            include: [{
                                model: Soal,
                                attributes: ["id", "soals", "id_type", "id_matpel", "jawaban", "isEssay"],
                                where: {
                                    id: {
                                        [Op.notIn]: tods
                                    },
                                },
                                include: [{
                                    model: Choice,
                                    attributes: ["choice", "id_soal", "isTrue"]
                                }],
                                offset: 0,
                                limit: 50,
                            }]
                        }]
                    }]
                })
                .then(async(res) => {
                    let todByIdTryout = await TOD.findAll({
                        where: { id_tryout: lastInsertIdTryout }
                    });
                    let data_all = res.map((item) => {
                        let matpel = item.matpels.map((mat) => {
                            let soalT = mat.soalTypes.map((sol) => {
                                let data_soal = sol.soals.map((s) => {
                                    let data_choice = s.choicesoals.map((c) => {
                                        return {
                                            choice: c.choice,
                                            isTrue: c.isTrue,
                                        }
                                    })
                                    return {
                                        id_soal: s.id,
                                        soals: s.soals,
                                        jawaban: s.jawaban,
                                        isEssay: s.isEssay,
                                        pembahasan: s.pembahasan,
                                        choice: data_choice,
                                    }
                                })
                                return {
                                    id: sol.id,
                                    type: sol.type,
                                    soals: data_soal,
                                }
                            })
                            return {
                                id: mat.id,
                                matpels: mat.nama,
                                soalType: soalT,
                            }
                        })
                        return {
                            id_tryout: lastInsertIdTryout,
                            tryoutDetails: todByIdTryout,
                            id_jenjang: item.id,
                            jenjang: item.jenjang,
                            id_matpel: item.id,
                            matpel: matpel,
                        };
                    })
                    if (res) {
                        resolve({
                            // id_tryout: lastInsertIdTryout,
                            data_tryout: data_all
                        })
                    } else {
                        reject("Data Not Found")
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }.bind(this))
    }

    fetchCondition(conditions) {
        return new Promise(function(resolve, reject) {
            var NewConditions = {};
            if (conditions.id) {
                NewConditions.id = conditions.id
            }
            if (conditions.id_type) {
                NewConditions.id_type = conditions.id_type
            }
            resolve(NewConditions)
        })
    }
    newSoal(body, file = "null") {
        let { soals, id_type, id_matpel, jawaban, choice, isEssay, imgPembahasan, textPembahasan, id_user } = body
        console.log(textPembahasan);
        console.log("=============================");
        return new Promise(function(resolve, reject) {
            Soal.create({
                    soals: soals,
                    id_type: id_type,
                    id_matpel: id_matpel,
                    isEssay: isEssay,
                    jawaban: jawaban,
                    imgPembahasan: imgPembahasan,
                    id_user: id_user,
                    pembahasan: imgPembahasan == 0 ? file.filename : textPembahasan,
                })
                .then(async(result) => {
                    if (result) {
                        choice = await choice.map((item) => {
                            return {
                                choice: item.value,
                                id_soal: result.id,
                                isTrue: item.isTrue
                            }
                        })
                        if (isEssay == 0) {
                            Choice.bulkCreate(choice, {
                                returning: true
                            }).then((res) => {
                                resolve("Success add Soal")
                            }).catch((err) => { reject("Failed Create Soal") })
                        } else {
                            resolve("Success add Soal")
                        }
                    } else {
                        reject("Failed Create Soal")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }

    newSoalVoice(body, file = "null") {
        let { soals, id_type, id_matpel } = body
        return new Promise(function(resolve, reject) {
            Soal.create({
                    soals: soals == null ? file[0].originalname : soals,
                    id_type: id_type,
                    id_matpel: id_matpel,
                    isEssay: 2,
                    jawaban: file[1].originalname,
                    imgPembahasan: 2,
                    pembahasan: null,
                })
                .then(async(result) => {
                    if (result) {
                        resolve("Success Add Soal")
                    } else {
                        reject("Failed Create Soal")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }

    UpdateSoal(id, body, file = "null") {
        let { soals, id_type, id_type_new, id_matpel, jawaban, choice, isEssay, imgPembahasan, textPembahasan, id_user } = body
        return new Promise(function(resolve, reject) {
            Soal.findOne({
                    where: { id: id },
                    returning: true
                })
                .then((found) => {
                    found.update({
                            soals: soals,
                            id_type: id_type,
                            id_matpel: id_matpel,
                            isEssay: isEssay,
                            jawaban: jawaban,
                            imgPembahasan: imgPembahasan,
                            pembahasan: imgPembahasan == 0 ? file.filename : textPembahasan,
                        })
                        .then(async(result) => {
                            if (result) {
                                if (isEssay == 0) {
                                    Choice.destroy({
                                        where: { id_soal: result.id }
                                    })
                                    choice = await choice.map((item) => {
                                        return {
                                            choice: item.value,
                                            id_soal: result.id,
                                            isTrue: item.isTrue
                                        }
                                    })
                                    Choice.bulkCreate(choice, {
                                        returning: true
                                    }).then((res) => {
                                        resolve("Success Update Soal")
                                    }).catch((err) => { reject("Failed Update Soal") })
                                } else {
                                    resolve("Success Update Soal")
                                }
                            } else {
                                reject("Failed Update Soal")
                            }
                        })
                })
                .catch((err) => { reject(err) })
        })
    }
    UpdateSoalPaket(id, body, file = "null") {
        let { id_type_new, id_user } = body
        return new Promise(function(resolve, reject) {
            Soal.findOne({
                    where: { id: id },
                    returning: true
                })
                .then((found) => {
                    found.update({
                            id_type_new: id_type_new,
                            id_user: id_user,
                        })
                        .then(async(result) => {
                            if (result) {
                                resolve("Success Update Soal")
                            } else {
                                reject("Failed Update Soal")
                            }
                        })
                })
                .catch((err) => { reject(err) })
        })
    }
    delete(id) {
        return new Promise(function(resolve, reject) {
            Soal.destroy({
                    where: { id: id }
                })
                .then((deleted) => {
                    if (deleted) {
                        resolve("Success Delete Soal")
                    } else {
                        reject("Failed Delete Soal")
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = Soals;
