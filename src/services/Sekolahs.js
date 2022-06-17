
const Area = require("@models").areas;
const Sekolahs = require("@models").sekolahs;
class Sekolah{
    constructor(){
    }

    getData(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                Sekolahs.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["nama", "ASC"]],
                    include: [
                      {
                        model: Area,
                        attributes: ["area"],
                      }
                    ],
                })
                .then(async (sekolahs)=>{
                    if(sekolahs){
                        let total = await Sekolahs.findAll()
                        resolve({total:total.length,data:sekolahs})
                    }else{
                        reject("Data Not Found")
                    }
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
            if(conditions.id_area){
                NewConditions.id_area = conditions.id_area
            }
            if(conditions.active){
                NewConditions.active = conditions.active
            }
            if(conditions.id_jenjang){
                NewConditions.id_jenjang = conditions.id_jenjang
            }
            resolve(NewConditions)
        })
    }

    createSekolah(data){
        console.log(data)
        let {id_area,sekolah,kkm,id_jenjang}= data;
        return new Promise(function(resolve,reject){
            Sekolahs.create({
              id_area:id_area,
              nama:sekolah,
              kkm: kkm,
              id_jenjang: id_jenjang,
              active: true
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Sekolahs")
                }else{
                    reject("Failed Added New Sekolahs")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    UpdateSekolah(id,body){
        const {sekolah,id_area,kkm,id_jenjang} = body
        return new Promise(function(resolve,reject){
            Sekolahs.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update(
                  {
                    nama:sekolah,
                    id_area: id_area,
                    kkm: kkm,
                    id_jenjang: id_jenjang
                  })
                  resolve("Success Update sekolah")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update sekolah")
                }else{
                    reject("Failed Update sekolah")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Sekolahs.destroy({
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


module.exports = Sekolah;
