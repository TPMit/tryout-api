
const Matpel = require("@models").matpels;
const Jenjang = require("@models").jenjangs;
class Matpels{
    constructor(){
    }


    getMatpel(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
              Matpel.findAll({
                where : condition,
                order: [["id", "ASC"]],
                include: [
                  {
                    model: Jenjang,
                    attributes: ["id","jenjang"],
                  }
                ]
              })
                .then(async (matpel)=>{
                  console.log(matpel)
                    if(matpel){
                        let total = await Matpel.findAll()
                        resolve({total:total.length,data:matpel})
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
            if(conditions.id_matpel){
                NewConditions.id = conditions.id_matpel
            }
            if(conditions.id_jenjang){
                NewConditions.id_jenjang = conditions.id_jenjang
            }
            resolve(NewConditions)
        })
    }
    newMatpel(body){
        console.log(body)
        let {matpel,id_jenjang,jumlah_soal} = body
        return new Promise(function(resolve,reject){
          Matpel.create({
              nama        : matpel,
              id_jenjang  : id_jenjang,
              active      : true,
              id_type     : 0,
              jumlah_soal: jumlah_soal,
          })
          .then((result)=>{
              if (result) {
                  resolve("Success Create New Matpel")
              } else {
                  reject("Failed Create New Matpel")
              }
          })
          .catch((err)=>{reject(err)})
        })
    }
    UpdateMatpel(id,body){
        const {matpel,id_jenjang,jumlah_soal} = body
        return new Promise(function(resolve,reject){
            Matpel.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                  nama:matpel,
                  id_jenjang:id_jenjang,
                  id_type:0,
                  jumlah_soal:jumlah_soal,
                })
                resolve("Success Update Matpel")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Matpel")
                }else{
                    reject("Failed Update Matpel")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Matpel.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Matpel")
                }else{
                    reject("Failed Delete Matpel")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = Matpels;
