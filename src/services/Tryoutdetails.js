
const Matpel = require("@models").matpels;
const Tryout = require("@models").tryouts;
const Pondok = require("@models").pondok;
const tryoutDetails = require("@models").tryoutDetails;
const detailPondoks = require("@models").detailPondoks;
const TODS = require("@models").tryoutDetailSoals;
const Soals = require("@models").soals;
const {Op} = require('sequelize');
const db = require("@models");

class tryoutdetails{
    constructor(){
    }

    getTryoutDetails(body){
        const {id_tryout} = body;
        return new Promise(function(resolve,reject){
            let sql = `SELECT tryoutDetails.id,tryoutDetails.nilai,tryoutDetails.status,matpels.id as idmatpel,matpels.nama,matpels.jumlah_soal,(SELECT COUNT(tryoutDetailSoals.id) FROM tryoutDetailSoals WHERE tryoutDetailSoals.id_tryoutDetail = tryoutDetails.id AND tryoutDetailSoals.status = 1) AS totalBenar, (SELECT COUNT(tryoutDetailSoals.id) FROM tryoutDetailSoals WHERE tryoutDetailSoals.id_tryoutDetail = tryoutDetails.id AND tryoutDetailSoals.status = 0) AS totalSalah FROM tryoutDetails LEFT JOIN matpels ON matpels.id = tryoutDetails.id_matpel WHERE tryoutDetails.id_tryout = ${id_tryout};`
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
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id_tryout){
                NewConditions.id = conditions.id_tryout
            }
            if(conditions.status){
                NewConditions.status = conditions.status
            }
            resolve(NewConditions)
        })
    }
    newTryoutDetails(body){
        let {id_tryout,id_matpel,nilai} = body
        return new Promise(function(resolve,reject){
            tryoutDetails.create({
                id_tryout    : id_tryout,
                id_matpel    : id_matpel,
                nilai        : nilai,
                status       : false,
            })
            .then((result)=>{
                if (result) {
                    resolve("Success Create New Try Out Details")
                } else {
                    reject("Failed Create New Try Out Details")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateTryoutDetails(id,body){
        let {id_tryout,id_matpel,nilai} = body
        return new Promise(function(resolve,reject){
            tryoutDetails.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update(
                    {
                        id_tryout    : id_tryout,
                        id_matpel    : id_matpel,
                        nilai        : nilai,
                        status       : false,
                    }
                )
                resolve("Success Update Try Out Details")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Try Out Details")
                }else{
                    reject("Failed Update Try Out Details")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            tryoutDetails.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Try Out Details")
                }else{
                    reject("Failed Delete Try Out Details")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    finishTryout(id){
      return new Promise(async function(resolve,reject){
          tryoutDetails.findOne({
              where:{id:id}
          })
          .then(async(found)=>{
              found.update(
                  {
                      status       : true,
                  }
              )
              Matpel.findOne({
                where:{id:found.id_matpel}
              }).then((res)=>{
                resolve("Tryout "+res.nama+" Finish")
              })
          })
          .catch((err)=>{reject(err)})
      })
    }

    PondokTryoutFinish(id){
      console.log('test');
      return new Promise(function(resolve,reject){
          let sql = `SELECT detailPondoks.id,detailPondoks.point, detailPondoks.status, detailPondoks.statusKoreksi FROM detailPondoks WHERE detailPondoks.id = ${id};`
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

    TryoutFinish(id_tryout,id_tryoutDetail){
      console.log('toss');
      let id_tryoutDetails = Object.values(id_tryoutDetail);
      return new Promise(function(resolve,reject){
        Tryout.findOne({
          where:{id:id_tryout},
        })
        .then(async (found)=>{
          let data_tod = await tryoutDetails.findAll({
            where:{
              id_tryout:found.id,
              id: id_tryoutDetails,
            },
            include: [{
                  model:Matpel,
                  attributes:["nama"]
              }],
            include: [{
              model: TODS,
              attributes: ["id_soal","jawaban_benar","jawaban_user","status"],
              include:[{
                model: Soals,
                attributes: ["pembahasan"]
              }]
            }],
            // raw : true
          });
          let id_tod = data_tod.map((item)=> item.id);

          let jawaban_benar = await TODS.findAll({
            where:{
              id_tryoutDetail:id_tod,
              status : true,
            },
            attributes: [[TODS.sequelize.fn('COUNT', 'status'), 'jawaban_benar']],
          });

          let jawaban_salah = await TODS.findAll({
            where:{
              id_tryoutDetail:id_tod,
              status : false,
            },
            attributes: [[TODS.sequelize.fn('COUNT', 'status'), 'jawaban_salah']],
          });
          // data_tod.push(jawaban_benar)
          // data_tod.push(jawaban_salah)
          data_tod = data_tod.map((item) => {
            return {
              id: item.id,
              id_tryout : item.id_tryout,
              id_matpel : item.id_matpel,
              nilai: item.nilai,
              status: item.status,
              jawaban_benar: jawaban_benar[0].jawaban_benar,
              jawaban_salah: jawaban_salah,
              tryoutDetailSoals: item.tryoutDetailSoals
            }
          })
          // console.log(data_tod);
          // console.log("data_tod");
          resolve({
              data: data_tod
            })
        })
        .catch(err=>{
            reject(err)
        })
      })
    }
}

module.exports = tryoutdetails;
