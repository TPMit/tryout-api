
const Choice = require("@models").choicesoals;
const Soals = require("@models").soals;
const Soalstype = require("@models").soalType;
class Choicesoal{
    constructor(){
    }


    getChoicesoal(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                Choice.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["choice", "ASC"]],
                    include: [
                      {
                        model: Soals,
                        attributes: ["soals"],
                      }
                    ],
                })
                .then(async (choicesoals)=>{
                    let total = await Choice.findAll()
                    resolve({total:total.length,data:choicesoals})
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
            if(conditions.id_soal){
                NewConditions.id_soal = conditions.id_soal
            }
            resolve(NewConditions)
        })
    }
    newChoicesoal(body){
        console.log(body)
        let {id_soal,choice} = body
        body = choice.map((item)=>{
            return {choice:item,id_soal:id_soal,isTrue:false}
        })
        return new Promise(function(resolve,reject){
            Choice.bulkCreate(body,{
                returning:true
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Choice Soal")
                }else{
                    reject("Failed Added New Choice Soal")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateChoiceSoal(id,body){
        const {id_soal,choice} = body
        return new Promise(function(resolve,reject){
            Choice.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({choice:choice,id_soal:id_soal})
                resolve("Success Update Choice Soal")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Choice Soal")
                }else{
                    reject("Failed Update Choice Soal")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Choice.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Choice Soal")
                }else{
                    reject("Failed Delete Choice Soal")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = Choicesoal;
