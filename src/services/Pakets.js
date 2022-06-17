const Paket = require("@models").pakets;
const Tryouts = require("@models").tryouts;
const Murids = require("@models").murids;
const {Op} = require('sequelize');
class Pakets{
    constructor(){
    }


    getPaket(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
              Paket.findAll({
                where : condition,
                order: [["id", "ASC"]],
              })
                .then(async (paket)=>{
                    if(paket){
                        resolve({data:paket})
                    }else{
                        reject("Data Not Found")
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
            .catch(err=>{reject})
        }.bind(this)) //
    }
    fetchCondition(conditions){
        return new Promise(function(resolve,reject){
            var NewConditions = {};
            if(conditions.id){
                NewConditions.id = conditions.id
            }
            if(conditions.isPondok){
                NewConditions.isPondok = conditions.isPondok
            }
            resolve(NewConditions)
        })
    }
    getPaketList(body){
        let {id_murid} = body;
        return new Promise(function(resolve,reject){
            Murids.findOne({
                where:{
                    id : id_murid
                },
            })
            .then(async (result) => {
                Tryouts.findAll({
                    where: {
                        id_murid : result.id
                    }
                })
                .then(async (dt) => {
                    let idP = dt.map((item) => item.id_paket);
                    let idS = dt.map((item) => item.status);
                    let dataPaket = await Paket.findAll({});
                    dataPaket = dataPaket.map((item, index) => {
                        return {
                            id_paket : item.id,
                            nama_paket : item.nama_paket,
                            waktu_pengerjaan : item.waktu_pengerjaan,
                            status : idP[index] == item.id && idS[index] == 1 ? "Sudah Selesai" : "Belum Selesai",
                        }
                    })

                    resolve({
                        id_murid : result.id,
                        paket : dataPaket
                    })

                })
                .catch((err) => {reject(err)})
            })
            .catch((err) =>{reject(err)})
        })
    }
    newPaket(body){
        console.log(body)
        let {nama_paket,waktu_pengerjaan,tanggal_selesai,isPondok} = body
        return new Promise(function(resolve,reject){
          Paket.create({
              nama_paket        : nama_paket,
              waktu_pengerjaan  : waktu_pengerjaan,
              tanggal_selesai   : tanggal_selesai,
              isPondok          : isPondok
          })
          .then((result)=>{
              if (result) {
                  resolve("Success Create New Paket")
              } else {
                  reject("Failed Create New Paket")
              }
          })
          .catch((err)=>{reject(err)})
        })
    }
    UpdatePaket(id,body){
        let {nama_paket,waktu_pengerjaan,tanggal_selesai,isPondok} = body
        return new Promise(function(resolve,reject){
            Paket.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                  nama_paket        : nama_paket,
                  waktu_pengerjaan  : waktu_pengerjaan,
                  tanggal_selesai   : tanggal_selesai,
                  isPondok          : isPondok
                })
                resolve("Success Update Paket")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Paket")
                }else{
                    reject("Failed Update Paket")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Paket.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Paket")
                }else{
                    reject("Failed Delete Paket")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = Pakets;
