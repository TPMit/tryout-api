
const Jurusan = require("@models").jurusans;
class Jurusans{
    constructor(){
    }


    getJurusan(){
        return new Promise(function(resolve,reject){
            Jurusan.findAll()
            .then((jurusan)=>{
                resolve(jurusan)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
    newJurusan(body,file = "null"){
        console.log(body)
        let {id_jenjang,jurusan} = body
        return new Promise(function(resolve,reject){
            Jurusan.create({
                id_jenjang  : id_jenjang,
                jurusan     : jurusan,
                icon        : file.originalname
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Jurusan")
                }else{
                    reject("Failed Added New Jurusan")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateJurusan(id,body,file = "null"){
        let {id_jenjang,jurusan} = body
        return new Promise(function(resolve,reject){
            Jurusan.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                  id_jenjang    : id_jenjang,
                  jurusan       : jurusan,
                  icon          : file.originalname
                })
                resolve("Success Update Jurusan")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Jurusan")
                }else{
                    reject("Failed Update Jurusan")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Jurusan.destroy({
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

module.exports = Jurusans;
