
const Daftar = require("@models").daftars;
const Murids = require("@models").murids;
const Sekolahs = require("@models").sekolahs;
const Crypto = require('crypto')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailgen = require('mailgen');

class Daftars{
    constructor(){
    }

    randomString(size = 5) {
        return Crypto
          .randomBytes(size)
          .toString('base64')
          .slice(0, size)
    }

    mathrRandom(){

    }

    getDaftar(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                Daftar.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model: Murids,
                        attributes: ["name"],
                      },
                      {
                        model: Sekolahs,
                        attributes: ["nama"],
                      }
                    ],
                })
                .then(async (daftars)=>{
                    let total = await Daftar.findAll()
                    resolve({total:total.length,data:daftars})
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
            if(conditions.id_murid){
                NewConditions.id_murid = conditions.id_murid
            }
            if(conditions.id_sekolah_tujuan){
                NewConditions.id_sekolah_tujuan = conditions.id_sekolah_tujuan
            }
            resolve(NewConditions)
        })
    }

    newDaftar(body){
        console.log(body)
        let stringRandom = this.randomString()
        let {id_murid,id_sekolah_tujuan,tgl_daftar} = body
        return new Promise(function(resolve,reject){
            Murids.findOne({
                where: {id:id_murid},
                returning:true
            })
            .then((result)=>{
                let email = result.email
                let nameMurid = result.name
                if(result){
                  Daftar.findOne({
                      where: {id_murid:id_murid}
                  }).then((res)=>{
                    if(res){
                        reject("Murid Has Been Registered")
                    }else{
                      Daftar.create({
                          id_murid:id_murid,
                          id_sekolah_tujuan:id_sekolah_tujuan,
                          tgl_daftar: tgl_daftar,
                          status: false,
                          code: "TPM-"+id_murid
                      })
                      .then((result)=>{
                          if(result){
                              //config mailgen
                              let mailGenerator = new Mailgen({
                                  theme: 'default',
                                  product: {
                                      // Appears in header & footer of e-mails
                                      name: 'TPM',
                                      link: 'https://candahar.com/'
                                      // Optional product logo
                                      // logo: 'https://mailgen.js/img/logo.png'
                                  }
                              });

                              var emailTemplate = {
                                  body: {
                                      name: nameMurid,
                                      intro: [
                                          'To Join Tryout Online You Must Verify Your Email',
                                           'Here`s Your Email Verifycation Code'
                                          ],
                                      outro: [
                                          "TPM-"+id_murid,
                                          'Do not Reply This message'
                                          ],
                                  }
                              };

                              let emailBody = mailGenerator.generate(emailTemplate);
                              //config mailgen

                              let transporter = nodemailer.createTransport(smtpTransport({
                                  service: 'gmail',
                                  host: 'smtp.gmail.com',
                                  auth: {
                                      user: 'tryouttpm@gmail.com',
                                      pass: 'tryout123'
                                  }
                                  })
                              );

                              let mailOptions = {
                                  from: 'no-reply@candahar.com',
                                  to: email,
                                  subject: 'Verification Email',
                                  html: emailBody,
                              };

                              transporter.sendMail(mailOptions, (err, info) => {
                                  if (err){
                                      console.log(err);
                                  } else {
                                      console.log('Email sent: ' + info.response);
                                  }
                              });
                              resolve("Success Added Daftar");
                          }else{
                              reject("Failed Added Daftar")
                          }
                      })
                      .catch((err)=>{reject(err)})
                    }
                  })
                }else{
                    reject("Murid Not Found")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }

    UpdateDaftar(id,body){
        let stringRandom = this.randomString()
        let {id_murid,id_sekolah_tujuan,tgl_daftar} = body
        return new Promise(function(resolve,reject){
            Daftar.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({
                    id_murid:id_murid,
                    id_sekolah_tujuan:id_sekolah_tujuan,
                    tgl_daftar: tgl_daftar,
                    status: true,
                    code: stringRandom
                })
                resolve("Success Update Daftar")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Daftar")
                }else{
                    reject("Failed Update Daftar")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Daftar.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Daftar")
                }else{
                    reject("Failed Delete Daftar")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    verifyCode(code){
        console.log(code)
        return new Promise(function(resolve,reject){
            Daftar.findOne({
                where:{
                    code:code,
                    status:false
                },
                include: [
                  {
                    model: Murids
                  },
                  {
                    model: Sekolahs
                  }
                ],
            })
            .then((result)=>{
                if(result){
                    if(result){
                        result.update({
                            status : true,
                        })
                        resolve(result)
                    }else{
                        reject("Code Already Verify")
                    }
                }else{
                    reject("Code Not Found")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    }
}

module.exports = Daftars;
