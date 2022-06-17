
const soaltype = require("@models").soalTypes;
const Matpel = require("@models").matpels;
class Soaltype{
    constructor(){
    }

    getSoalTypes(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
              soaltype.findAll({
                where : condition,
                order: [["id", "ASC"]],
                include: [
                  {
                    model: Matpel,
                    attributes: ["id","nama"],
                  }
                ]
              })
              .then(async (matpel)=>{
                console.log(matpel)
                  if(matpel){
                      let total = await soaltype.findAll()
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
            if(conditions.id_type){
                NewConditions.id = conditions.id_type
            }
            if(conditions.id_matpel){
                NewConditions.id_matpel = conditions.id_matpel
            }
            resolve(NewConditions)
        })
    }

    newSoalType(body){
        console.log(body)
        let {type,id_matpel} = body
        return new Promise(function(resolve,reject){
            soaltype.create({
                type:type,
                active:true,
                id_matpel:id_matpel
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Soal Type")
                }else{
                    reject("Failed Added New Soal Type")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateSoalType(id,body){
        const {type,id_matpel} = body
        return new Promise(function(resolve,reject){
            soaltype.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                  type:type,
                  id_matpel:id_matpel
                })
                resolve("Success Update Soal Type")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Soal Type")
                }else{
                    reject("Failed Update Soal Type")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            soaltype.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Soal Type")
                }else{
                    reject("Failed Delete Soal Type")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = Soaltype;
