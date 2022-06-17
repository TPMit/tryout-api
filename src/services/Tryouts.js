const Guru = require("@models").gurus;
const Murid = require("@models").murids;
const Tryout = require("@models").tryouts;
const DetailPondok = require("@models").detailPondoks;
const TOD = require("@models").tryoutDetails;
const TODS = require("@models").tryoutDetailSoals;
const Matpels = require("@models").matpels;
const Paket = require("@models").pakets;
const Soal = require("@models").soals;
const soalType = require("@models").soalTypes;
const Matpel = require("@services/Matpels");
const Soals = require('@services/Soals');
const Daftar = require("@models").daftars;
const Area = require("@models").areas;
const Sekolahs = require("@models").sekolahs;
const TryoutDetails = require('@services/Tryoutdetails');
const Choice = require("@models").choicesoals;
const Jenjang = require("@models").jenjangs;
const Psikotes = require("@models").psikotes;
const JawabanPsikotes = require("@models").jawabanPsikotes;
const JawabanBacaQurans = require("@models").jawabanBacaQurans;
const JawabanBahasaIndonesias = require("@models").jawabanBahasaIndonesias;
const JawabanBerhitungAngkas = require("@models").jawabanBerhitungAngkas;
const JawabanBerhitungSoals = require("@models").jawabanBerhitungSoals;
const JawabanHafalanJuzs = require("@models").jawabanHafalanJuzs;
const JawabanHukumTajwids = require("@models").jawabanHukumTajwids;
const JawabanImlas = require("@models").jawabanImlas;
const JawabanPraktekIbadahs = require("@models").jawabanPraktekIbadahs;
const Crypto = require('crypto');
const { Op } = require('sequelize');
const db = require("@models");

class Tryouts {
    constructor() {}

    randomString(size = 50) {
        return Crypto
            .randomBytes(size)
            .toString('base64')
            .slice(0, size)
    }
    info(body) {
        return new Promise((resolve, reject) => {
            const { id } = body;
            Tryout.findOne({
                    where: { id: id },
                    include: [{
                            model: Jenjang,
                            as: 'tingkat'
                        },
                        {
                            model: Paket
                        },
                        {
                            model: Guru
                        },
                        {
                            model: Murid
                        }
                    ]
                })
                .then((res) => {
                    if (res) {
                        resolve(res)
                    } else {
                        reject("not found")
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    soalTryout(body) {
        return new Promise(async function(resolve, reject) {
            const { id_matpel, id_tryout_detail } = body;
            let jumlahSoal = await Matpels.findOne({
                where: {
                    id: id_matpel
                },
                attributes: ['jumlah_soal']
            });
            TODS.findAll({
                where: {
                    id_tryoutDetail: id_tryout_detail,
                },
                include: [{
                    model: Soal,
                    include: [{
                        model: Choice,
                        attributes: ["choice", "id_soal", "isTrue"]
                    }]
                }]
            }).then(async(tods) => {
                if (tods) {
                    var sudahDikerjakan = tods.length;
                    var idAda = tods.map((item) => item.id_soal);
                    var soalsisa = await Soal.findAll({
                        where: {
                            id_matpel: id_matpel,
                            id: {
                                [Op.notIn]: idAda
                            }
                        },
                        limit: jumlahSoal.jumlah_soal - sudahDikerjakan,
                        include: [{
                            model: Choice,
                            attributes: ["choice", "id_soal", "isTrue"]
                        }]
                    });
                    tods = tods.map((t) => {
                        return {
                            id_tryoutDetailSoals: t.id,
                            id: t.id_soal,
                            jawaban_user: t.jawaban_user,
                            soal: t.soal.soals,
                            jawaban_benar: t.soal.jawaban,
                            choice: t.soal.choicesoals,
                            status: t.status,
                            isEssay: t.soal.isEssay,
                            pembahasan: t.soal.pembahasan,
                            imgPembahasan: t.soal.imgPembahasan
                        }
                    })
                    soalsisa = soalsisa.map((s) => {
                        return {
                            id: s.id,
                            jawaban_user: null,
                            soal: s.soals,
                            jawaban_benar: s.jawaban,
                            choice: s.choicesoals,
                            status: false,
                            isEssay: s.isEssay,
                            pembahasan: s.pembahasan
                        }
                    })
                    Array.prototype.push.apply(tods, soalsisa);
                    resolve(tods);
                } else {
                    var soalsisa = await Soal.findAll({
                        where: {
                            id_matpel: id_matpel
                        },
                        limit: jumlahSoal.jumlah_soal,
                        include: [{
                            model: Choice,
                            attributes: ["choice", "id_soal", "isTrue"]
                        }]
                    });
                    soalsisa = soalsisa.map((s) => {
                        return {
                            id: s.id,
                            jawaban_user: null,
                            soal: s.soals,
                            jawaban_benar: s.jawaban,
                            choice: s.choicesoals,
                            status: false,
                            isEssay: s.isEssay,
                            pembahasan: s.pembahasan
                        }
                    })
                    resolve(soalsisa);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }
    getTryout(conditions) {
        return new Promise(function(resolve, reject) {
            this.fetchCondition(conditions)
                .then((condition) => {
                    Tryout.findAll({
                            where: condition,
                            offset: parseInt(conditions.offset),
                            limit: parseInt(conditions.limit),
                            order: [
                                ["code_akses", "ASC"]
                            ],
                            include: [{
                                    model: Guru,
                                    attributes: ["nama"],
                                },
                                {
                                    model: Paket,
                                },
                                {
                                    model: TOD,
                                    attributes: ["id"],
                                    include: [{
                                        model: Matpels,
                                        attributes: ["nama"],
                                        include: [{
                                            model: soalType,
                                            attributes: ["id", "type"]
                                        }]
                                    }]
                                },
                                {
                                    model: Murid,
                                    attributes: ["name"],
                                },
                            ],
                        })
                        .then(async(tryouts) => {
                            let total = await Tryout.findAll()
                            resolve({ total: total.length, data: tryouts })
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => { reject })
        }.bind(this))
    }
    fetchCondition(conditions) {
        return new Promise(function(resolve, reject) {
            var NewConditions = {};
            if (conditions.id) {
                NewConditions.id = conditions.id
            }
            if (conditions.id_guru) {
                NewConditions.id_guru = conditions.id_guru
            }
            if (conditions.id_murid) {
                NewConditions.id_murid = conditions.id_murid
            }
	    if(conditions.id_jenjang){
              NewConditions.jenjang = conditions.id_jenjang
            }
            if(conditions.id_paket){
                NewConditions.id_paket = conditions.id_paket
            }
            if (conditions.code_akses) {
                NewConditions.code_akses = conditions.code_akses
            }
            if (conditions.status) {
                NewConditions.status = conditions.status
            }
            resolve(NewConditions)
        })
    }
    newTryout(body) {
        let soal = new Soals();
        let matpel = new Matpel();
        let { id_guru, id_murid, tgl, id_jenjang, id_paket ,idSekolahTujuan} = body
        let code = this.randomString();
        return new Promise(async function(resolve, reject) {
          console.log('idnyaaa'+id_jenjang);
            if (id_jenjang == 16) {
              Tryout.findOne({
                where: {
                  id_murid: id_murid,
                  jenjang: id_jenjang,
                  id_paket: id_paket,
                }
              }).then((found) => {
                if (found) {
                  resolve(found.id);
                } else {
                  Tryout.create({
                    code_akses: code,
                    jenjang: id_jenjang,
                    id_guru: null,
                    id_murid: id_murid,
                    tgl: tgl,
                    status: false,
                    id_paket: id_paket,
                    statusKoreksi: false,
                    idSekolahTujuan : null
                  })
                  .then(async(result) => {


                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Psikotes",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 1,
                    }).then(async(res) => {

                        let sql = `select * from psikotes where psikotes.id_paketPondok = ${id_paket} AND psikotes.id not in (SELECT jawabanPsikotes.id_soal FROM jawabanPsikotes where jawabanPsikotes.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 5;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanPsikotes: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          console.log(dataTODS);
                          JawabanPsikotes.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Baca Alquran",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 2,
                    }).then(async(res) => {

                        let sql = `select * from bacaQurans where bacaQurans.id_paketPondok = ${id_paket} AND bacaQurans.id not in (SELECT jawabanBacaQurans.id_soal FROM jawabanBacaQurans where jawabanBacaQurans.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 1;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanBacaQuran: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanBacaQurans.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Hukum Tajwids",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 3
                    }).then(async(res) => {

                        let sql = `select * from hukumTajwids where hukumTajwids.id_paketPondok = ${id_paket} AND hukumTajwids.id not in (SELECT jawabanHukumTajwids.id_soal FROM jawabanHukumTajwids where jawabanHukumTajwids.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 5;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanHukumTajwids: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanHukumTajwids.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Hafalan Juz",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 4
                    }).then(async(res) => {

                        let sql = `select * from hafalanJuzs where hafalanJuzs.id_paketPondok = ${id_paket} AND hafalanJuzs.id not in (SELECT jawabanHafalanJuzs.id_soal FROM jawabanHafalanJuzs where jawabanHafalanJuzs.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 5;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanHafalanJuz: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanHafalanJuzs.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: 'Ammaliyah',
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan : 5
                    }).then(async(res) => {

                        let sql = `select * from praktekIbadahs where praktekIbadahs.id_paketPondok = ${id_paket} AND praktekIbadahs.statusSoal = 1 AND praktekIbadahs.id not in (SELECT jawabanPraktekIbadahs.id_soal FROM jawabanPraktekIbadahs where jawabanPraktekIbadahs.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 5;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanPraktekIbadah: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanPraktekIbadahs.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: 'Qoliyah',
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 6
                    }).then(async(res) => {

                        let sql = `select * from praktekIbadahs where praktekIbadahs.id_paketPondok = ${id_paket} AND praktekIbadahs.statusSoal = 0 AND praktekIbadahs.id not in (SELECT jawabanPraktekIbadahs.id_soal FROM jawabanPraktekIbadahs where jawabanPraktekIbadahs.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 5;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanPraktekIbadah: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanPraktekIbadahs.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    //imla
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Imla",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 7
                    }).then(async(res) => {

                        let sql = `select * from imlaDetails where imlaDetails.id_paketPondok = ${id_paket} AND imlaDetails.id not in (SELECT jawabanImlas.id_soal FROM jawabanImlas where jawabanImlas.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 1;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanImla: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanImlas.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    //berhitung Angka
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Berhitung Angka",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 8
                    }).then(async(res) => {

                        let sql = `select * from berhitungAngkas where berhitungAngkas.id_paketPondok = ${id_paket} AND berhitungAngkas.id not in (SELECT jawabanBerhitungAngkas.id_soal FROM jawabanBerhitungAngkas where jawabanBerhitungAngkas.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 1;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanBerhitungAngka: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanBerhitungAngkas.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Berhitung Soal",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 9
                    }).then(async(res) => {

                        let sql = `select * from berhitungSoals where berhitungSoals.id_paketPondok = ${id_paket} AND berhitungSoals.id not in (SELECT jawabanBerhitungSoals.id_soal FROM jawabanBerhitungSoals where jawabanBerhitungSoals.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 1;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanBerhitungSoal: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanBerhitungSoals.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })
                    DetailPondok.create({
                      code_akses: code,
                      id_murid: id_murid,
                      namaSoal: "Bahasa Indonesia",
                      tgl: tgl,
                      statusKoreksi: false,
                      id_paketPondok: id_paket,
                      id_tryout: result.id,
                      status: false,
                      statusKoreksi : false,
                      point: 0,
                      urutan: 10
                    }).then(async(res) => {

                        let sql = `select * from bahasaIndonesias where bahasaIndonesias.id_paketPondok = ${id_paket} AND bahasaIndonesias.id not in (SELECT jawabanBahasaIndonesias.id_soal FROM jawabanBahasaIndonesias where jawabanBahasaIndonesias.idDetailPondok in (select detailPondoks.id from detailPondoks where detailPondoks.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${id_murid} )) ) limit 1;`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              idDetailPondok: res.id,
                              id_soal: a.id,
                              jawabanBahasaIndonesia: a.kunciJawaban,
                              status: 0,
                            }
                          })
                          JawabanBahasaIndonesias.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });

                    })

                  })
                  .catch((err) => { reject(err) })
                }
              })
            }else{
              // console.log(id_jenjang);
              Tryout.findOne({
                where: {
                  id_murid: id_murid,
                  jenjang: id_jenjang,
                  id_paket: id_paket,
                }
              }).then((found) => {
                if (found) {
                  resolve(found.id);
                } else {
                  Tryout.create({
                    code_akses: code,
                    jenjang: id_jenjang,
                    id_guru: null,
                    id_murid: id_murid,
                    tgl: tgl,
                    status: false,
                    id_paket: id_paket,
                    statusKoreksi: false,
                    idSekolahTujuan : idSekolahTujuan
                  })
                  .then(async(result) => {

                    let data_matpel = await Matpels.findAll({
                      where: {
                        id_jenjang: id_jenjang,
                      },
                      offset: 0
                    });

                    let data_baru = data_matpel.map((item) => {
                      return {
                        id_tryout: result.id,
                        id_matpel: item.id,
                        nilai: 0,
                        status: false,
                        statusKoreksi: false
                      }
                    })
                    TOD.bulkCreate(data_baru, {
                      returning: true
                    }).then(async(res) => {
                      var idMatpel = res.map(async(item) => {
                        let jumlahSoal = await Matpels.findOne({
                          where: {
                            id: item.id_matpel
                          },
                          attributes: ['jumlah_soal']
                        });
                        let sql = `select * from soals where soals.id_matpel = ${item.id_matpel} AND soals.id not in (SELECT tryoutDetailSoals.id_soal FROM tryoutDetailSoals where tryoutDetailSoals.id_tryoutDetail in (select tryoutDetails.id from tryoutDetails where tryoutDetails.id_tryout in (select tryouts.id from tryouts where tryouts.id_murid=${result.id_murid} )) ) limit ${jumlahSoal.jumlah_soal};`
                        db.sequelize.query(sql, {
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then(async(e) => {
                          var dataTODS = e.map((a) => {
                            return {
                              id_tryoutDetail: item.id,
                              id_soal: a.id,
                              jawaban_benar: a.jawaban,
                              status: 0,
                            }
                          })
                          TODS.bulkCreate(dataTODS, {
                            returning: true
                          })
                          .then(async(Newresult) => {
                            resolve(result.id)
                          })
                        })
                        .catch((error) => {
                          reject(error)
                        });
                      });
                    })
                  })
                  .catch((err) => { reject(err) })
                }
              })

            }
        })
    }
    UpdateTryout(id, body) {
        let { id_guru, id_murid, tgl, jenjang, id_paket , idSekolahTujuan} = body
        let code = this.randomString()
        return new Promise(function(resolve, reject) {
            Tryout.findOne({
                    where: { id: id }
                })
                .then((found) => {
                    found.update({
                        code_akses: code,
                        id_guru: id_guru,
                        id_murid: id_murid,
                        tgl: tgl,
                        status: false,
                        jenjang: jenjang,
                        id_paket: id_paket,
			idSekolahTujuan : idSekolahTujuan
                    })
                    resolve("Success Update Try Out")
                })
                .then((updated) => {
                    if (updated) {
                        resolve("Success Update Try Out")
                    } else {
                        reject("Failed Update Try Out")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }
    delete(id) {
        return new Promise(function(resolve, reject) {
            Tryout.destroy({
                    where: { id: id }
                })
                .then((deleted) => {
                    if (deleted) {
                        resolve("Success Delete Try out")
                    } else {
                        reject("Failed Delete Try out")
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    verifyCode(code_akses) {
        return new Promise(function(resolve, reject) {
            Tryout.findOne({
                    where: {
                        code_akses: code_akses
                    },
                    returning: true
                })
                .then((result) => {
                    if (result) {
                        result.update({
                            status: true,
                        })
                        resolve("Success Verify Code Akses")
                    } else {
                        reject("Code Akses Not Found")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    historyTryout(body) {
        return new Promise(function(resolve, reject) {
            let { id_murid } = body;
            Tryout.findAll({
                    where: {
                        id_murid: id_murid,
                        id_paket: {
                            [Op.not]: '26'
                        }
                    },
                    include: [{
                            model: Jenjang,
                            as: 'tingkat'
                        },
                        {
                            model: Paket
                        },
                        {
                            model: Guru
                        },
                        {
                            model: Murid
                        }
                    ]
                })
                .then((res) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject("not found")
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        }.bind(this))
    }

    getjenjangname(id) {
        switch (id) {
            case 1:
                return "SD"
                break;
            case 2:
                return "SMP"
                break;
            case 3:
                return "SMA"
                break;
            case 5:
                return "SMA"
                break;
            case 6:
                return "SMK"
                break;
            case 7:
                return "SMK"
                break;
            case 8:
                return "SMK"
                break;
            case 13:
                return "PTN"
                break;
            case 14:
                return "PTN"
                break;
            case 16:
                return "PONDOK"
                break;

            default:
                return "PONDOK"
                break;
        }
    }

    isisekolahans(newIdJenjang, conditions) {
        var sekolahans = {};
        // var sekolahans = new Map();
        return new Promise(async(resolve, reject) => {
            for (var i = 0; i < newIdJenjang.length; i++) {
                var data_sekolah = await Sekolahs.findAll({
                    where: {
                        id_jenjang: newIdJenjang[i],
                        id_area: conditions.id_area
                    },
                    limit: parseInt(conditions.limit),
                    include: [{
                        model: Area
                    }]
                }).bind(this);
                console.log(typeof data_sekolah)
                if (data_sekolah) {
                    var sekolahada = sekolahans[this.getjenjangname(newIdJenjang[i])];
                    if (sekolahada) {
                        sekolahada.push(data_sekolah)
                        sekolahans[this.getjenjangname(newIdJenjang[i])] = sekolahada;
                    } else {
                        console.log(this.getjenjangname(newIdJenjang[i]));
                        sekolahans[this.getjenjangname(newIdJenjang[i])] = data_sekolah;
                    }
                }
            }
            resolve(sekolahans);
        })
    }

    // rasioGrades(conditions) {
    //     return new Promise(function(resolve, reject) {
    //         this.DataCondition(conditions)
    //             .then((condition) => {
    //                 Tryout.findAll({
    //                     where: condition,
    //                     include: [{
    //                         model: TOD,
    //                     }, ],
    //                 }).then(async(data) => {

    //                     var idJenjang = data.map((item) => item.jenjang)
    //                     var newIdJenjang = [3, 5, 6, 7, 8];
    //                     idJenjang = parseInt(idJenjang[0]);
    //                     console.log(idJenjang)
    //                     if (idJenjang == 1) {
    //                         newIdJenjang = [2]
    //                     } else
    //                     if (idJenjang == 2) {
    //                         newIdJenjang = [3, 5, 6, 7, 8]
    //                     } else if (idJenjang == 3 || idJenjang == 5 || idJenjang == 6 || idJenjang == 7 || idJenjang == 8) {
    //                         newIdJenjang = [13, 14]
    //                     } else if (idJenjang == 16) {
    //                         newIdJenjang = [16]
    //                     }
    //                     this.isisekolahans(newIdJenjang, conditions).then((sekolahansTMP) => {
    //                         // console.log(data_sekolah);
    //                         data = data.map((item) => {
    //                                 // var nilai = item.tryoutDetails.length != 0 ?  item.tryoutDetails.reduce((c,x)=>{
    //                                 // 	return c.nilai + x.nilai
    //                                 // }) : 0;
    //                                 const nilai = item.tryoutDetails.map((res) => res.nilai);
    //                                 const total = nilai.reduce(function(c, x) {
    //                                     return c + x
    //                                 })
    //                                 var sekolahFixedget = [];
    //                                 for (var key in sekolahansTMP) {
    //                                     console.log(sekolahansTMP);
    //                                     sekolahansTMP[key] = sekolahansTMP[key].filter((tro) => tro.nama != undefined)
    //                                     console.log(sekolahansTMP[key]);
    //                                     if (sekolahansTMP[key].length > 0) {
    //                                         var tmp = sekolahansTMP[key].map((das) => {
    //                                             return {
    //                                                 namaSekolah: das.nama,
    //                                                 kkm: das.kkm,
    //                                                 grades: total / item.tryoutDetails.length < das.kkm ? "Tidak Lolos" : "Lolos",
    //                                                 area: das.area != undefined ? das.area.area : ""
    //                                             }
    //                                         });
    //                                         sekolahFixedget.push({
    //                                             jenjang: key,
    //                                             data: tmp
    //                                         })
    //                                     }
    //                                 }
    //                                 return {
    //                                     id: item.id,
    //                                     id_murid: item.id_murid,
    //                                     id_paket: item.id_paket,
    //                                     status: item.status,
    //                                     tgl: item.tgl,
    //                                     // @ts-ignore
    //                                     totalNilai: parseInt(total / item.tryoutDetails.length),
    //                                     dataSekolah: sekolahFixedget,
    //                                 }
    //                             })
    //                             // console.log(sekolahansTMP);
    //                         resolve(data);
    //                     }).catch((err) => {
    //                         reject(err)
    //                     })
    //                 }).catch((err) => { reject(err) })
    //             })
    //     }.bind(this))
    // }

    rasioGrades(conditions){
        return new Promise(function(resolve,reject){
            this.DataCondition(conditions)
            .then((condition) =>{
              Tryout.findAll({
                where: condition,
                include: [
                  {
                    model : TOD,
                  },
                ],
              }).then(async (data) => {
                let data_sekolah;
                if(conditions.idSekolahTujuan){
                  data_sekolah = await Sekolahs.findAll({
                      where: {id:conditions.idSekolahTujuan},
                      limit : parseInt(conditions.limit),
                      include: [
                        {
                          model : Area
                        }
                      ]
                    });
                }else{
                  data_sekolah = await Sekolahs.findAll({
                    where: {id_jenjang:16},
                    limit : parseInt(conditions.limit),
                    include: [
                      {
                        model : Area
                      }
                    ]
                  });
                }
                data = data.map((item)=>{
                  const nilai = item.tryoutDetails.map((res) => res.nilai);
                  const total = nilai.reduce(function (c,x) {
                    return c + x
                  })
                  data_sekolah = data_sekolah.map((das) => {
                    return{
                      namaSekolah : das.nama,
                      kkm: das.kkm,
                      grades : total / item.tryoutDetails.length < das.kkm ? "Tidak Lolos" : "Lolos",
                      area : das.area.area
                    }
                  })
                  return {
                        id : item.id,
                      id_murid : item.id_murid,
                      id_paket : item.id_paket,
                      status : item.status,
                      tgl : item.tgl,
                      // @ts-ignore
                      totalNilai : parseInt(total / item.tryoutDetails.length),
                      dataSekolah: data_sekolah,
                  }
              })
                resolve(data);
              }).catch((err) => {reject(err)})
            })
        }.bind(this))
      }

    DataCondition(conditions) {
        return new Promise(function(resolve, reject) {
            var NewConditions = {};
            if (conditions.id) {
                NewConditions.id = conditions.id
            }
            if (conditions.id_murid) {
                NewConditions.id_murid = conditions.id_murid
            }
            if(conditions.idSekolahTujuan){
                NewConditions.idSekolahTujuan = conditions.idSekolahTujuan
            }
            resolve(NewConditions)
        })
    }


    changeStatus(id) {
        return new Promise(function(resolve, reject) {
            Tryout.findOne({
                    where: {
                        id: id
                    },
                    returning: true
                })
                .then((result) => {
                    if (result) {
                        result.update({
                            status: true,
                        })
                        resolve("Success Finish Tryout")
                    } else {
                        reject("Failed Finish Tryout")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    report(body) {
        const { type, filter } = body
        return new Promise(function(resolve, reject) {
            let sql = type == 1 ? `select count(tryouts.id) as total,Day(tryouts.createdAt) as day from tryouts where MONTH(tryouts.createdAt) = ${filter} group by Day(tryouts.createdAt);` :
                `select count(tryouts.id) as total,MONTH(tryouts.createdAt) as month from tryouts where YEAR(tryouts.createdAt) = ${filter} group by MONTH(tryouts.createdAt);`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }
    koreksiList(){
        return new Promise(function(resolve, reject) {
            let sql = "SELECT tryouts.id,tryouts.tgl,tryouts.statusKoreksi,tryouts.status,gurus.nama as guru,gurus.id as id_guru,murids.name,pakets.nama_paket FROM tryouts LEFT JOIN gurus ON gurus.id = tryouts.id_guru INNER JOIN murids on murids.id = tryouts.id_murid INNER JOIN pakets on pakets.id = tryouts.id_paket WHERE jenjang = 16 and status =1;";
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }
    koreksiTryout() {
        return new Promise(function(resolve, reject) {
            Tryout.findAll({
                where: { statusKoreksi: 0 },
                include: [{
                        model: Murid
                    },
                    {
                        model: Paket
                    }
                ]
            }).then((res) => {
                console.log(res)
                res = res.map((item) => {
                    return {
                        id_tryout: item.id,
                        status: item.status,
                        jenjang: item.jenjang,
                        nama_murid: item.murid.name,
                        statusKoreksi: item.statusKoreksi,
                        paket: item.paket
                    }
                });
                if (res) {
                    resolve(res)
                } else {
                    reject("Failed Get Tryout")
                }
            });
        });
    }

    koreksiMatpel(body) {
        let { id_tryout } = body;
        return new Promise(function(resolve, reject) {
            TOD.findAll({
                where: { id_tryout: id_tryout },
                include: [{
                    model: Matpels
                }]
            }).then((res) => {
                res = res.map((item) => {
                    return {
                        id_tryoutDetail: item.id,
                        id_tryout: item.id_tryout,
                        nilai: item.nilai,
                        status: item.status,
                        statusKoreksi: item.statusKoreksi,
                        nama_matpel: item.matpel.nama
                    }
                })
                if (res) {
                    resolve(res)
                } else {
                    reject("Failed Get Matpel")
                }
            });
        });
    }

    koreksiMatpelPondok(body) {
        let { id_tryout } = body;
        return new Promise(function(resolve, reject) {
            DetailPondok.findAll({
                where: { id_tryout: id_tryout },
            }).then((res) => {
                res = res.map((item) => {
                    return {
                        id_tryoutDetail: item.id,
                        id_tryout: item.id_tryout,
                        nilai: item.point,
                        status: item.status,
                        statusKoreksi: item.statusKoreksi,
                        nama_matpel: item.namaSoal,
                        urutan: item.urutan
                    }
                })
                if (res) {
                    resolve(res)
                } else {
                    reject("Failed Get Matpel")
                }
            });
        });
    }

    startKoreksi(body){
      let {id_tryout,id_guru} = body
      return new Promise(function(resolve,reject){
          Tryout.findOne({
              where:{
                  id: id_tryout
              },
              returning:true
          })
          .then((result)=>{
              if(result){
                  result.update({
                      statusKoreksi  : 2,
		      id_guru : id_guru
                  }).then((res)=>{
                      resolve("Success")
                  }).catch((err)=>{reject("Failed")})
              }else{
                  reject("Failed")
              }
          })
          .catch((err)=>{
              console.log(err)
          })
      })
    }

    startKoreksiMatpel(body){
      let {id_tryoutDetail} = body
      return new Promise(function(resolve,reject){
          TOD.findOne({
              where:{
                  id: id_tryoutDetail
              },
              returning:true
          })
          .then((result)=>{
              if(result){
                  result.update({
                      statusKoreksi  : 2,
                  }).then((res)=>{
                      resolve("Success")
                  }).catch((err)=>{reject("Failed")})
              }else{
                  reject("Failed")
              }
          })
          .catch((err)=>{
              console.log(err)
          })
      })
    }

    koreksiSoal(body) {
        let { id_tryoutDetail } = body;
        return new Promise(function(resolve, reject) {
            TODS.findAll({
                where: { id_tryoutDetail: id_tryoutDetail },
                include: [{
                    model: Soal,
                }]
            }).then((res) => {
                res = res.map((item) => {
                    return {
                        id_tryoutDetailSoals: item.id,
                        id_tryoutDetail: item.id_tryoutDetail,
                        jawaban_user: item.jawaban_user,
                        jawaban_benar: item.jawaban_benar,
                        filename: item.filename,
                        status: item.status,
                        soal: item.soal.soals,
                        pembahasan: item.soal.pembahasan,
                        imgPembahasan: item.soal.imgPembahasan,
                    }
                })
                if (res) {
                    resolve(res)
                } else {
                    reject("Failed Get Matpel")
                }
            })
        })
    }

    koreksiSelesai(body) {
        let { id_tryout } = body
        return new Promise(function(resolve, reject) {
            Tryout.findOne({
                    where: {
                        id: id_tryout
                    },
                    returning: true
                })
                .then((result) => {
                    if (result) {
                        result.update({
                            statusKoreksi: true,
                        })
                        resolve("Success Koreksi Tryout")
                    } else {
                        reject("Failed Koreksi Tryout")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    koreksiMatpelSelesai(body) {
        let { id_tryoutDetail } = body
        return new Promise(function(resolve, reject) {
            TOD.findOne({
                    where: {
                        id: id_tryoutDetail
                    },
                    returning: true
                })
                .then((result) => {
                    if (result) {
                        result.update({
                            statusKoreksi: true,
                        })
                        resolve("Success Koreksi Matpel Tryout")
                    } else {
                        reject("Failed Koreksi Matpel Tryout")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    koreksiJawaban(body) {
        console.log(body)
        let { id_tryoutDetailSoal, status } = body
        return new Promise(function(resolve, reject) {
            TODS.findOne({
                    where: {
                        id: id_tryoutDetailSoal
                    },
                    returning: true
                })
                .then(async(result) => {
                    if (result) {
                        if (status == 1) {
                            let data_matpel = await TOD.findOne({
                                where: { id: result.id_tryoutDetail },
                                include: [{
                                    model: Matpels
                                }]
                            });
                            TOD.findOne({
                                where: { id: result.id_tryoutDetail }
                            }).then(async(dat) => {
                                dat.update({
                                    nilai: dat.nilai + parseFloat(1 / data_matpel.matpel.jumlah_soal * 100)
                                });
                                result.update({
                                    status: status,
                                })
                                resolve("Success Koreksi Tryout")
                            });
                        } else {
                            result.update({
                                status: status,
                            })
                            resolve("Success Koreksi Tryout")
                        }
                    } else {
                        reject("Failed Koreksi Tryout")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    koreksiJawabanPondok(body) {
      let { id_tryoutDetail, nilai} = body
      let code = this.randomString()
      return new Promise(function(resolve, reject) {
          DetailPondok.findOne({
                  where: { id: id_tryoutDetail }
              })
              .then((found) => {
                  found.update({
                      point : nilai,
                      statusKoreksi : 1,
                  })
                  resolve("Success Update Nilai")
              })
              .then((updated) => {
                  if (updated) {
                      resolve("Success Update Nilai")
                  } else {
                      reject("Failed Update Nilai")
                  }
              })
              .catch((err) => { reject(err) })
      })
    }

}

module.exports = Tryouts;
