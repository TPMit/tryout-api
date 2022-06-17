const Murids = require("@models").murids;
const Sekolahs = require("@models").sekolahs;
const Daftars = require("@models").daftars;
const Gurus = require("@models").gurus;
const Users = require("@models").users;
const bcrypt = require("bcrypt");

class Auth{

    constructor(){
    }

    Validate(body){
        return new Promise(async function(resolve,reject){
            let {email,password} = body
            // search user on table Users First
            let user = await this.getOnUsers(email)
            let murid = await this.getOnMurids(email)
            let murid_off = await this.getOnMuridsOff(email)
            let guru = await this.getOnGurus(email)
            if(user){
                await bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(!err && isMatch){
                        resolve({type:"USER",data_user:user})
                    }else{
                        reject("Users Not found !, Maybe Your Email is Wrong or not verified")
                    }
                })
            }else if(murid){
                await bcrypt.compare(password,murid.password,(err,isMatch)=>{
                    if(!err && isMatch){
                        resolve({type:"MURID",data_murid:murid})
                    }else{
                        reject("Murid Not found !, Maybe Your Email is Wrong")
                    }
                })
            }
            else if(murid_off){
                await bcrypt.compare(password,murid_off.password,(err,isMatch)=>{
                    if(!err && isMatch){
                        resolve({type:"MURIDOFF",data_murid:murid_off})
                    }else{
                        reject("Murid Not found !, Maybe Your Email is Wrong")
                    }
                })
            }else if(guru){
                await bcrypt.compare(password,guru.password,(err,isMatch)=>{
                    if(!err && isMatch){
                        resolve({type:"GURU",data_guru:guru})
                    }else{
                        reject("Guru Not found !, Maybe Your Email is Wrong")
                    }
                })
            }else{
                reject("Account Not found !, Maybe Your Email is Wrong")
            }
        }.bind(this))
    }
    getOnUsers(email){
        return new Promise(function(resolve,reject){
            Users.findOne({
                where:{email:email}
            })
            .then((user)=>{
                if(user){
                    resolve(user)
                }else{
                    resolve(null)
                }
            })
            .catch(err=>{reject(err)})
        }.bind(this))
    }
    getOnMurids(email){
        return new Promise(function(resolve,reject){
            Murids.findOne({
                where:{email:email},
                include :[
                    {
                        model:Sekolahs,
                    }
                ]
            })
            .then((murid)=>{
                if(murid){
                    Daftars.findOne({
                        where:{id_murid:murid.id,status: true}
                    }).then((res)=>{
                      if(res){
                          resolve(murid)
                      }else{
                          resolve(null)
                      }
                    })
                }else{
                    resolve(null);
                }
            })
            .catch(err=>{reject(err)})
        }.bind(this))
    }
    getOnMuridsOff(email){
        return new Promise(function(resolve,reject){
            Murids.findOne({
                where:{email:email},
                include :[
                    {
                        model:Sekolahs,
                    }
                ]
            })
            .then((murid)=>{
                if(murid){
                    Daftars.findOne({
                        where:{id_murid:murid.id,status: false}
                    }).then((res)=>{
                      if(res){
                          resolve(murid)
                      }else{
                          resolve(null)
                      }
                    })
                }else{
                    resolve(null);
                }
            })
            .catch(err=>{reject(err)})
        }.bind(this))
    }
    getOnGurus(email){
        return new Promise(function(resolve,reject){
            Gurus.findOne({
                where:{email:email},
                include :[
                    {
                        model:Sekolahs,
                    }
                ]
            })
            .then((murid)=>{
                if(murid){
                    resolve(murid)
                }else{
                    resolve(null)
                }
            })
            .catch(err=>{reject(err)})
        }.bind(this))
    }
}

module.exports = Auth;
