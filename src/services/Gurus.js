const Tryout = require("@models").tryouts;
const Guru = require("@models").gurus;
const Sekolahs = require("@models").sekolahs;
class Gurus{
    constructor(){
    }


    getGuru(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                Guru.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model: Sekolahs,
                        attributes: ["nama"],
                      }
                    ],
                })
                .then(async (gurus)=>{
		    var idGuru = gurus.map((item) => item.id);
		    var dataKoreksi = await Tryout.findAll({
                            where : {id_guru : idGuru}
                        });
                    var data = gurus.map((item) => {
                        return {
                            id : item.id,
                            nama : item.nama,
                            nip : item.nip,
                            email : item.email,
                            phone : item.phone,
                            picture : item.picture,
                            sekolah : item.sekolah,
                            dataKoreksi : dataKoreksi ? dataKoreksi.length : 0
                        }
                    })
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
            if(conditions.id_sekolah){
                NewConditions.id_sekolah = conditions.id_sekolah
            }
            resolve(NewConditions)
        })
    }
    newGuru(body,file = "null"){
        let {nama,id_sekolah,nip,email,phone,password} = body
        return new Promise(function(resolve,reject){
            Guru.findOne({
                where: {email:email},
                returning:true
            })
            .then((result)=>{
                if(result){
                    reject("Email Already In Use")
                }else{
                    Guru.create({
                        nama        : nama,
                        id_sekolah  : id_sekolah,
                        nip         : nip,
                        email       : email,
                        phone       : phone,
                        password    : password,
                        picture     : file.originalname,
                    })
                    .then((result)=>{
                        if (result) {
                            resolve("Success Create New Guru")
                        } else {
                            reject("Failed Create New Guru")
                        }
                    })
                    .catch((err)=>{reject(err)})
                }
            })
        })
    }
    UpdateGuru(id,body,file){
        let {nama,id_sekolah,nip,email,phone,password} = body
        return new Promise(function(resolve,reject){
            Guru.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update(
                    {
                        nama        : nama,
                        id_sekolah  : id_sekolah,
                        nip         : nip,
                        email       : email,
                        phone       : phone,
                        password    : password,
                        picture     : file.originalname,
                    }
                )
                resolve("Success Update Guru")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Guru")
                }else{
                    reject("Failed Update Guru")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Guru.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Guru")
                }else{
                    reject("Failed Delete Guru")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}

module.exports = Gurus;
