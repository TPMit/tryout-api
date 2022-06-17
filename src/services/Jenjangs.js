// @ts-nocheck
const Jurusan = require("@models").jurusans;
const Jenjang = require("@models").jenjangs;
const db = require("@models");
class Jenjangs{
    constructor(){
    }


    getJenjang(body){
        return new Promise(function(resolve,reject){
            const { id, id_jenjang } = body;
            if (id==null && id_jenjang==null) {
              Jenjang.findAll({
                  order: [["id", "ASC"]],
                  include: [
                    {
                      model: Jurusan,
                      attributes: ["jurusan"],
                    },
                  ],
              })
              .then((jenjang)=>{
                  resolve(jenjang)
              })
              .catch((err)=>{
                  reject(err)
              })
            }else if(id_jenjang==null){
              Jenjang.findAll({
                where: {
                    id: id
                },
                  order: [["id", "ASC"]],
                  include: [
                    {
                      model: Jurusan,
                      attributes: ["jurusan"],
                    },
                  ],
              })
              .then((jenjang)=>{
                  resolve(jenjang)
              })
              .catch((err)=>{
                  reject(err)
              })
            }else{
              let sql = `SELECT * FROM tryout.jenjangs where id between ${id} AND ${id_jenjang};`
                  db.sequelize.query(sql, {
                  type: db.sequelize.QueryTypes.SELECT,
                  }).then((r)=>resolve(r)).catch((err)=>reject(err))
            }

        })
    }
    newJenjang(body,file = "null"){
        console.log(body)
        let {jenjang} = body
        return new Promise(function(resolve,reject){
            Jenjang.create({
                jenjang: jenjang,
                icon: file.originalname,
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Jenjang")
                }else{
                    reject("Failed Added New Jenjang")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateJenjang(id,body,file = "null"){
        console.log(file)
        console.log("ini file")
        const {jenjang} = body
        return new Promise(function(resolve,reject){
            Jenjang.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({jenjang:jenjang,icon:file.originalname})
                resolve("Success Update Jenjang")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Jenjang")
                }else{
                    reject("Failed Update Jenjang")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Jenjang.destroy({
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
    report() {
        return new Promise(function(resolve,reject) {
            let sql = `select tryout.jenjangs.jenjang,(select count(tryout.tryouts.id) from tryout.tryouts where tryout.tryouts.jenjang = tryout.jenjangs.id) as total from tryout.jenjangs;`
                db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
                }).then((r)=>resolve(r)).catch((err)=>reject(err))
        })
    }
}

module.exports = Jenjangs;
