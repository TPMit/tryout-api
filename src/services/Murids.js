const Murids = require("@models").murids;
const Sekolahs = require("@models").sekolahs;
const Daftar = require("@models").daftars;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailgen = require('mailgen');

class Murid {
    constructor() {}

    getData(conditions) {
        return new Promise(function(resolve, reject) {
            this.fetchCondition(conditions)
                .then((condition) => {
                    Murids.findAll({
                            where: condition,
                            offset: parseInt(conditions.offset),
                            limit: parseInt(conditions.limit),
                            order: [
                                ["name", "ASC"]
                            ],
                            include: [{
                                    model: Sekolahs,
                                    attributes: ["nama"],
                                },
                                {
                                    model: Daftar,
                                    include: {
                                        model: Sekolahs,
                                        attributes: ["nama"],
                                    }
                                }
                            ],
                        })
                        .then(async(murids) => {
                            if (murids) {
                                resolve(murids)
                            } else {
                                reject("Data Not Found")
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => { reject })
        }.bind(this))
    }
    fetchCondition(conditions) {
        return new Promise(function(resolve, reject) {
            var NewConditions = {};
            if (conditions.id) {
                NewConditions.id = conditions.id
            }
            if (conditions.id_sekolah) {
                NewConditions.id_sekolah = conditions.id_sekolah
            }
            resolve(NewConditions)
        })
    }

    createMurid(data, file = "null") {
        let date = new Date();
        let { id_sekolah, name, email, password, phone, tgl_lahir, kelamin, alamat, id_sekolah_tujuan } = data;
        return new Promise(function(resolve, reject) {
          Murids.findOne({
            where:{email:email}
          })
          .then((result)=>{
              if(result){
                  reject("Duplicate Murids")
              }else{
                Murids.create({
                  id_sekolah: id_sekolah,
                  name: name,
                  email: email,
                  password: password,
                  phone: phone,
                  tgl_lahir: tgl_lahir,
                  kelamin: kelamin,
                  alamat: alamat,
                  picture: file.originalname,
                })
                .then((result) => {
                  Daftar.create({
                    id_murid: result.id,
                    id_sekolah_tujuan: id_sekolah_tujuan,
                    tgl_daftar: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                    status: false,
                    code: "" + Math.floor(1000 + Math.random() * 9000)
                  }).then((res) => {
                    if (res) {
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
                          name: name,
                          intro: [
                            'To Join Tryout Online You Must Verify Your Email',
                            'Here`s Your Email Verifycation Code'
                          ],
                          outro: [
                            res.code,
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
                      }));

                      let mailOptions = {
                        from: 'no-reply@candahar.com',
                        to: email,
                        subject: 'Verification Email',
                        html: emailBody,
                      };

                      transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      resolve("Success Added New Murids");
                    } else {
                      reject("Failed Added New Murids")
                    }
                  })
                })
                .catch((err) => { reject(err) })
              }
          })
          .catch((err)=>{
              reject(err)
          })
        })
    }

    UpdateMurid(id, body, file = "null") {
        console.log(file);
        let { id_sekolah, name, email, password, phone, tgl_lahir, kelamin, alamat, id_sekolah_tujuan } = body;
        let objUpdate = {}
        if (id_sekolah != "" && id_sekolah != null) {
            objUpdate.id_sekolah = id_sekolah;
        }
        if (name != "" && name != null) {
            objUpdate.name = name;
        }
        if (email != "" && email != null) {
            objUpdate.email = email;
        }
        if (password != "" && password != null) {
            objUpdate.password = password;
        }
        if (phone != "" && phone != null) {
            objUpdate.phone = phone;
        }
        if (tgl_lahir != "" && tgl_lahir != null) {
            objUpdate.tgl_lahir = tgl_lahir;
        }
        if (kelamin != "" && kelamin != null) {
            objUpdate.kelamin = kelamin;
        }
        if (alamat != "" && alamat != null) {
            objUpdate.alamat = alamat;
        }
        if (id_sekolah_tujuan != "" && id_sekolah_tujuan != null) {
            objUpdate.id_sekolah_tujuan = id_sekolah_tujuan;
        }
        if (file != "null" && file != null) {
            objUpdate.picture = file.filename;
        }


        return new Promise(function(resolve, reject) {
            Murids.findOne({
                    where: { id: id },
                    returning: true
                })
                .then((found) => {
                    found.update(objUpdate);
                    if (id_sekolah_tujuan) {
                        Daftar.findOne({
                            where: { id_murid: found.id },
                            returning: true
                        }).then((res) => {
                            res.update({
                                id_sekolah_tujuan: id_sekolah_tujuan
                            })
                        })
                        resolve("Success Update Murids")
                    }
                    resolve("Success Update Murids")
                })
                .then((updated) => {
                    if (updated) {
                        resolve("Success Update Murids")
                    } else {
                        reject("Failed Update Murids")
                    }
                })
                .catch((err) => { reject(err) })
        })
    }

    delete(id) {
        return new Promise(function(resolve, reject) {
            Murids.destroy({
                    where: { id: id }
                })
                .then((deleted) => {
                    if (deleted) {
                        resolve("Success Delete Murids")
                    } else {
                        reject("Failed Delete Murids")
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}


module.exports = Murid;
