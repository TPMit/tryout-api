// @ts-nocheck
const psikotes = require("@models").psikotes;
const bacaQuran = require("@models").bacaQuran;
const bahasaIndonesia = require("@models").bahasaIndonesias;
const hukumTajwids = require("@models").hukumTajwids;
const praktekIbadah = require("@models").praktekIbadah;
const hafalanJuz = require("@models").hafalanJuz;
const imlaDetail = require("@models").imlaDetails;
const imlaKecil = require("@models").imlaKecils;
const berhitungAngka = require("@models").berhitungAngkas;
const berhitungSoal = require("@models").berhitungSoals;
const detailPondoks = require("@models").detailPondoks;
const jawabanPsikotes = require("@models").jawabanPsikotes;
const jawabanBacaQuran = require("@models").jawabanBacaQurans;
const jawabanBahasaIndonesia = require("@models").jawabanBahasaIndonesias;
const jawabanHukumTajwids = require("@models").jawabanHukumTajwids;
const jawabanPraktekIbadah = require("@models").jawabanPraktekIbadahs;
const jawabanHafalanJuz = require("@models").jawabanHafalanJuzs;
const jawabanImla = require("@models").jawabanImlas;
const jawabanBerhitungAngka = require("@models").jawabanBerhitungAngkas;
const jawabanBerhitungSoal = require("@models").jawabanBerhitungSoals;
const Crypto = require('crypto');
const { Op } = require('sequelize');
const db = require("@models");
class Areas{
    constructor(){
    }

    getDetailPondoks(body){
      const {id_tryout} = body;
      return new Promise(function(resolve,reject){
          let sql = `SELECT detailPondoks.id,detailPondoks.point, detailPondoks.status, detailPondoks.urutan, detailPondoks.namaSoal, detailPondoks.statusKoreksi FROM detailPondoks WHERE detailPondoks.id_tryout = ${id_tryout} ORDER BY detailPondoks.urutan;`
          db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
              })
              .then(function (e) {
                resolve(e);
              })
              .catch((error) => {
                reject(error);
              });
          //             this.fetchCondition(conditions)
//             .then((condition)=>{
//               Tryout.findAll({
//                   where : condition,
//                   offset: parseInt(conditions.offset),
//                   limit : parseInt(conditions.limit),
//                   order: [["id", "ASC"]],
//                   include: [
//                     {
//                       model: tryoutDetails,
//                       include: [
//                         {
//                           model: Matpel,
//                         }
//                       ]
//                     },
//                   ],
//               })
//                 .then(async (tryout)=>{
//                     resolve({data:tryout})
//                 })
//                 .catch(err=>{
//                     reject(err)
//                 })
//             })
//             .catch(err=>{reject})
      }.bind(this))
    }

    finishDetailPondoks(body){
      const {id_tryout} = body;
      return new Promise(function(resolve,reject){
          let sql = `SELECT detailPondoks.id, detailPondoks.status FROM detailPondoks WHERE detailPondoks.id = ${id_tryout};`
          db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
              })
              .then(function (e) {
                resolve(e);
              })
              .catch((error) => {
                reject(error);
              });
          //             this.fetchCondition(conditions)
//             .then((condition)=>{
//               Tryout.findAll({
//                   where : condition,
//                   offset: parseInt(conditions.offset),
//                   limit : parseInt(conditions.limit),
//                   order: [["id", "ASC"]],
//                   include: [
//                     {
//                       model: tryoutDetails,
//                       include: [
//                         {
//                           model: Matpel,
//                         }
//                       ]
//                     },
//                   ],
//               })
//                 .then(async (tryout)=>{
//                     resolve({data:tryout})
//                 })
//                 .catch(err=>{
//                     reject(err)
//                 })
//             })
//             .catch(err=>{reject})
      }.bind(this))
    }

    getSoalPsikotes(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;
          console.log('getSoalPsikotes');
          jawabanPsikotes.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: psikotes,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  // var soalsisa = await psikotes.findAll({
                  //     where: {
                  //         id: {
                  //             [Op.notIn]: idAda
                  //         }
                  //     },
                  //     limit: 5 - sudahDikerjakan,
                  // });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.psikote.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanPsikotes,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await psikotes.findAll({
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalBacaQuran(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanBacaQuran.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: bacaQuran,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await bacaQuran.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 5 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.bacaQuran.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanBacaQuran,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await bacaQuran.findAll({
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalBahasaIndonesia(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanBahasaIndonesia.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: bahasaIndonesia,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await bahasaIndonesia.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 1 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.bahasaIndonesia.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanBahasaIndonesia,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await bahasaIndonesia.findAll({
                      limit: 1,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalHukumTajwids(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanHukumTajwids.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: hukumTajwids,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await hukumTajwids.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 5 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.hukumTajwid.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanHukumTajwids,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await hukumTajwids.findAll({
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalPraktekIbadahQoliyah(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanPraktekIbadah.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: praktekIbadah,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await praktekIbadah.findAll({
                      where: {
                          statusSoal: 0,
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 5 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.praktekIbadah.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanPraktekIbadah,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await praktekIbadah.findAll({
                      where: {
                          statusSoal: 0,
                      },
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalPraktekIbadahAmaliyah(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanPraktekIbadah.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: praktekIbadah,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await praktekIbadah.findAll({
                      where: {
                          statusSoal: 1,
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 5 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.praktekIbadah.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanPraktekIbadah,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await praktekIbadah.findAll({
                      where: {
                          statusSoal: 1,
                      },
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalHafalanJuz(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanHafalanJuz.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: hafalanJuz,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await hafalanJuz.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 5 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.hafalanJuz.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanHafalanJuz,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await hafalan.findAll({
                      limit: 5,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalImla(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanImla.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: imlaDetail,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await imlaDetail.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 1 - sudahDikerjakan,
                      // include: [{
                      //   model: imlaKecil,
                      // }]
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.imlaDetail.soal,
                          soal_dua: t.imlaDetail.soal_dua,
                          soal_tiga: t.imlaDetail.soal_tiga,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanImla,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await imlaDetail.findAll({
                      limit: 1,
                      // include: [{
                      //     model: imlaKecil,
                      // }]
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban,
                          // soalKecil: s.imlaKecil.soal,
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalBerhitungAngka(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanBerhitungAngka.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: berhitungAngka,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await berhitungAngka.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 1 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.berhitungAngka.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanBerhitungAngka,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await berhitungAngka.findAll({
                      limit: 1,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getSoalBerhitungSoal(body){
      return new Promise(async function(resolve, reject) {
          const { id_tryout } = body;

          jawabanBerhitungSoal.findAll({
              where: {
                  idDetailPondok: id_tryout,
              },
              include: [{
                  model: berhitungSoal,
              }]
          }).then(async(tods) => {
              if (tods) {
                  var sudahDikerjakan = tods.length;
                  var idAda = tods.map((item) => item.id_soal);
                  var soalsisa = await berhitungSoal.findAll({
                      where: {
                          id: {
                              [Op.notIn]: idAda
                          }
                      },
                      limit: 1 - sudahDikerjakan,
                  });
                  console.log(tods);
                  tods = tods.map((t) => {
                      return {
                          id_tryoutDetailSoals: t.id,
                          id_tryoutDetail : t.idDetailPondok,
                          id: t.id_soal,
                          soal: t.berhitungSoal.soal,
                          jawaban_user: t.jawaban_user,
                          jawaban_benar: t.jawabanBerhitungSoal,
                          status: t.status,
                      }
                  })
                  // soalsisa = soalsisa.map((s) => {
                  //     return {
                  //       id: s.id,
                  //       // jawaban_user: null,
                  //       soal: s.soal,
                  //       kunci_jawaban: s.kunciJawaban,
                  //     }
                  // })
                  // Array.prototype.push.apply(tods, soalsisa);
                  Array.prototype.push.apply(tods);
                  resolve(tods);
              } else {
                  var soalsisa = await berhitungSoal.findAll({
                      limit: 1,
                  });
                  console.log(soalsisa);
                  soalsisa = soalsisa.map((s) => {
                      return {
                          id: s.id,
                          // jawaban_user: null,
                          soal: s.soal,
                          kunci_jawaban: s.kunciJawaban
                      }
                  })
                  resolve(soalsisa);
              }
          }).catch((err) => {
            console.log(err);
              reject(err);
          })
      })
    }

    getPsikotes(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                psikotes.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }

    //==== UPDATE JAWABAN ====
    updateJawabanPsikotes(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanPsikotes.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              psikotes.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanPsikotes.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanBacaQuran(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanBacaQuran.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              bacaQuran.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanBacaQuran.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanHukumTajwids(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanHukumTajwids.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              hukumTajwids.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanHukumTajwids.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanPraktekIbadah(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanPraktekIbadah.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              praktekIbadah.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanPraktekIbadah.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanHafalanJuz(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanHafalanJuz.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              hafalanJuz.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanHafalanJuz.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanImla(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanImla.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              imlaDetail.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanImla.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanBerhitungAngka(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanBerhitungAngka.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              berhitungAngka.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanBerhitungAngka.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanBerhitungSoal(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanBerhitungSoal.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              berhitungSoal.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanBerhitungSoal.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    updateJawabanBahasaIndonesia(body,file){
        let {id}= body;
        return new Promise(function(resolve,reject){
            jawabanBahasaIndonesia.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
              bahasaIndonesia.findOne({
                  where:{id:found.id_soal},
                  returning:true
              }).then(async (res) => {
                let data_matpel = await detailPondoks.findOne({
                  where:{id:found.idDetailPondok},
                  // include:[
                  //   {
                  //     model: Matpel
                  //   }
                  // ]
                });
                let jawaban;
                let jawaban_benar;
                let pictureName;

                if(file){
                    pictureName = file.filename;
                }else{
                  pictureName = null
                }

                  found.update({
                      jawaban_user:       pictureName,
                      status:             true,
                  })
                  .then(async(result)=>{
                    let response = await jawabanBahasaIndonesia.findOne({
                      where : {id:result.id},
                      offset: 0,
                      order: [["id", "ASC"]],
                    });
                      if(result){
                          resolve({
                            data:response,
                            message: "Update Tryout Success"
                          });
                      }else{
                          reject("Failed Update Tryout Detail Soals")
                      }
                  })
                  .catch((err)=>{reject(err)})

              })
            })
        })
    }

    //==== end update jawaban ====

    changeStatusPondok(id) {
        return new Promise(function(resolve, reject) {
            detailPondoks.findOne({
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

    newPsikotes(body){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            psikotes.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : kunciJawaban,
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Psikotes")
                }else{
                    reject("Failed Added New Soal Psikotes")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updatePsikotes(id,body,file=null){
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            psikotes.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
	            kunciJawaban : file.originalname ? file.originalname : null,
                })
                resolve("Success Update Soal Psikotes")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Psikotes")
                }else{
                    reject("Failed Update Soal Psikotes")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deletePsikotes(id){
        return new Promise(function(resolve,reject){
            psikotes.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
    getBacaQuran(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                bacaQuran.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newBacaQuran(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            bacaQuran.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Membaca Al Quran")
                }else{
                    reject("Failed Added New Soal Membaca Al Quran")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateBacaQuran(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            bacaQuran.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                })
                resolve("Success Update Soal Membaca Al Quran")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Membaca Al Quran")
                }else{
                    reject("Failed Update Soal Membaca Al Quran")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteBacaQuran(id){
        return new Promise(function(resolve,reject){
            bacaQuran.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getHukumTajwids(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                hukumTajwids.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newHukumTajwids(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            hukumTajwids.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Hukum Tajwids")
                }else{
                    reject("Failed Added New Soal Hukum Tajwids")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateHukumTajwids(id,body,file){
        let {id_paketPondok,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            hukumTajwids.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
		    soal : file[0].originalname,
		    kunciJawaban : file[1].originalname ? file[1].originalname : null,
                })
                resolve("Success Update Soal Hukum Tajwids")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Hukum Tajwids")
                }else{
                    reject("Failed Update Soal Hukum Tajwids")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteHukumTajwids(id){
        return new Promise(function(resolve,reject){
            hukumTajwids.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getHafalanJuz(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                hafalanJuz.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newHafalanJuz(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            hafalanJuz.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : kunciJawaban,
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Hafalan Juz")
                }else{
                    reject("Failed Added New Soal Hafalan Juz")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateHafalanJuz(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            hafalanJuz.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                })
                resolve("Success Update Soal Hafalan Juz")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Hafalan Juz")
                }else{
                    reject("Failed Update Soal Hafalan Juz")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteHafalanJuz(id){
        return new Promise(function(resolve,reject){
            hafalanJuz.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getPraktekIbadah(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                praktekIbadah.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            if(conditions.status){
                NewConditions.status = conditions.status
            }
            resolve(NewConditions)
        })
    }
    newPraktekIbadahQoliyah(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            praktekIbadah.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : kunciJawaban,
                statusSoal : 0
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Praktek Ibadah Qoliyah")
                }else{
                    reject("Failed Added New Soal Praktek Ibadah Qoliyah")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    newPraktekIbadahAmaliyah(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            praktekIbadah.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
                statusSoal : 1
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Praktek Ibadah Amaliyah")
                }else{
                    reject("Failed Added New Soal Praktek Ibadah Amaliyah")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updatePraktekIbadah(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            praktekIbadah.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                })
                resolve("Success Update Soal Praktek Ibadah")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Praktek Ibadah")
                }else{
                    reject("Failed Update Soal Praktek Ibadah")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deletePraktekIbadah(id){
        return new Promise(function(resolve,reject){
            praktekIbadah.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getImla(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                imlaDetail.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: imlaKecil,
                    //   },
                    // ],
                  })
                  .then(async (data)=>{
                      resolve({data:data})
                  })
                  .catch(err=>{
                      reject(err)
                  })
              })
              .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }

    newImla(body,file = null){
        let {id_paketPondok,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            imlaDetail.create({
                id_paketPondok : id_paketPondok,
                soal : file[0].originalname,
                soal_dua : file[1].originalname ? file[1].originalname : null,
                soal_tiga : file[2].originalname ? file[2].originalname : null,
                kunciJawaban : file[3].originalname ? file[3].originalname : null,
            })
            .then((result)=>{
                if(result){
                    resolve("Success add Soal Imla")
                    // for(let i = 1; i<file.length; i++){
                    //     ImlaKecil.create({
                    //         id_imlaDetail : result.id,
                    //         soal : file[i].originalname
                    //     })
                    // }
                }else{
                    reject("Failed Added New Soal Imla")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateImlaDetail(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban} = body
        return new Promise(function(resolve,reject){
            imlaDetail.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : file.originalname,
                    kunciJawaban : kunciJawaban
                })
                resolve("Success Update Soal Imla Detail")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Imla Detail")
                }else{
                    reject("Failed Update Soal Imla Detail")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }

    // updateImlaKecil(id,body,file = null){
    //     let {id_imlaDetail} = body
    //     return new Promise(function(resolve,reject){
    //         ImlaKecil.findOne({
    //             where:{id:id}
    //         })
    //         .then((found)=>{
    //             found.update({
    //                 id_imlaDetail : id_imlaDetail,
    //                 soal : file.originalname,
    //             })
    //             resolve("Success Update Soal Imla Kecil")
    //         })
    //         .then((updated)=>{
    //             if(updated){
    //                 resolve("Success Update Soal Imla Kecil")
    //             }else{
    //                 reject("Failed Update Soal Imla Kecil")
    //             }
    //         })
    //         .catch((err)=>{reject(err)})
    //     })
    // }
    deleteImla(id){
        return new Promise(function(resolve,reject){
            imlaDetail.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getBahasaIndonesia(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                bahasaIndonesia.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newBahasaIndonesia(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            bahasaIndonesia.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
                waktu : waktu
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Bahasa Indonesia")
                }else{
                    reject("Failed Added New Soal Bahasa Indonesia")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateBahasaIndonesia(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            bahasaIndonesia.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                    waktu : waktu
                })
                resolve("Success Update Soal Bahasa Indonesia")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Bahasa Indonesia")
                }else{
                    reject("Failed Update Soal Bahasa Indonesia")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteBahasaIndoensia(id){
        return new Promise(function(resolve,reject){
            bahasaIndonesia.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getBerhitungAngka(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                berhitungAngka.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newBerhitungAngka(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            berhitungAngka.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
                waktu : waktu
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Berhitung Angka")
                }else{
                    reject("Failed Added New Soal Berhitung Angka")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateBerhitungAngka(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            berhitungAngka.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                    waktu : waktu
                })
                resolve("Success Update Soal Berhitung Angka")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Berhitung Angka")
                }else{
                    reject("Failed Update Soal Berhitung Angka")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteBerhitungAngka(id){
        return new Promise(function(resolve,reject){
            berhitungAngka.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    getBerhitungSoal(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                berhitungSoal.findAll({
                    where : condition,
                    order: [["id", "ASC"]],
                    // include: [
                    //   {
                    //     model: Area,
                    //   },
                    // ],
                })
                .then(async (data)=>{
                    resolve({data:data})
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this))
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            resolve(NewConditions)
        })
    }
    newBerhitungSoal(body,file = null){
        console.log(body)
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            berhitungSoal.create({
                id_paketPondok : id_paketPondok,
                soal : soal,
                kunciJawaban : file.originalname ? file.originalname : null,
                waktu : waktu
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Berhitung Soal")
                }else{
                    reject("Failed Added New Soal Berhitung Soal")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    updateBerhitungSoal(id,body,file = null){
        let {id_paketPondok,soal,kunciJawaban,waktu} = body
        return new Promise(function(resolve,reject){
            berhitungSoal.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_paketPondok : id_paketPondok,
                    soal : soal,
                    kunciJawaban : file.originalname ? file.originalname : null,
                    waktu : waktu
                })
                resolve("Success Update Soal Berhitung Soal")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Berhitung Soal")
                }else{
                    reject("Failed Update Soal Berhitung Soal")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    deleteBerhitungSoal(id){
        return new Promise(function(resolve,reject){
            berhitungSoal.destroy({
                where:{id:id}
            })
            .then((result)=>{
                resolve(Boolean(parseInt(result.toString())))
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}


module.exports = Areas;
