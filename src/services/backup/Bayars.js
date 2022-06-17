// @ts-nocheck
const Tryout = require("@models").tryouts;
const Bayar = require("@models").bayars;
const Harga = require("@models").hargas;
const Murids = require("@models").murids;
const Logs = require("@models").logs;
const midtransClient = require('midtrans-client');
const x = require('../xendit');
const moment = require('moment');
const db = require("@models");
const Reports = require('@services/Reports');
let _report = new Reports();
const dotenv = require('dotenv');

dotenv.config();


// ====== MIDTRANS =========
const _merchantId = 'G953549076';
const _clientKey = 'Mid-client-E82r_sPCFSTCZNgt';
const _serverKey = 'Mid-server-5dXcYNrU0xqjY_X7nXyDH4wS';
 // const _clientKey = 'SB-Mid-client-J_M3gA1gPuP-eru4';
 // const _serverKey = 'SB-Mid-server-7uQ7Ylq-cVxC-pzDs5big69L';
 // const _merchantId = 'G284458991';
const midtrans = new midtransClient.CoreApi({
                    isProduction : true,
                    clientKey : _clientKey,
                    serverKey : _serverKey
});

// ======== Xendit =======
// const _secretKey = 'xnd_development_9p4awwgZplUW6KzAReSTt2x3R2XQeLpLh88e6nWfekrxfh2poQF9qIX4XaEPnb';
// const xendit = new XenditClient({
//   secretKey: 'xnd_development_9p4awwgZplUW6KzAReSTt2x3R2XQeLpLh88e6nWfekrxfh2poQF9qIX4XaEPnb',
//   xenditURL: 'https://api.xendit.co/'
// });


class Bayars{
    constructor(){
    }

    getBayarById(body){
        let {id} = body
        return new Promise(function (resolve,reject) {
            Bayar.findOne({
                where:{id:id},
                include: [
                    {
                        model: Murids,
                        attributes: ["name"],
                    }
                ],
                returning: true
            }).then((result)=>{
                let core = new midtransClient.CoreApi({
                    isProduction : true,
                    clientKey : _clientKey,
                    serverKey : _serverKey
                  });
                  core.transaction.status(id)
                  .then((response)=>{
                    const data = {
                        id                  : result.id,
                        id_tryout           : result.id_tryout,
                        tanggal             : moment(result.tgl).format('YYYY-MM-DD HH:mm:ss'),
                        batas_waktu         : moment(result.batas_waktu).format('YYYY-MM-DD HH:mm:ss'),
                        id_murid            : result.id_murid,
                        nama_murid          : result.murid.name,
                        metode_pembayaran   : result.metode_pembayaran,
                        tanggal             : response.transaction_time,
                        va_number           : response.va_numbers,
                        transaction_status  : response.transaction_status,
                        amount              : response.gross_amount,
                        payment_amounts     : response.payment_amounts,
                        deeplink            : result.deeplink != null ? result.deeplink : null,
                    }
                    resolve({
                        data:data,
                    })
                });
            })
        })
    }

    getBayar(conditions){
        return new Promise(function(resolve,reject){
            this.fetchCondition(conditions)
            .then((condition)=>{
                Bayar.findAll({
                    where : condition,
                    offset: parseInt(conditions.offset),
                    limit : parseInt(conditions.limit),
                    order: [["id", "ASC"]],
                    include: [
                      {
                        model: Murids,
                        attributes: ["name"],
                      }
                    ],
                })
                .then(async (bayars)=>{
                    resolve({
                        data:bayars,
                    })
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
            resolve(NewConditions)
        })
    }
    newBayar(body){
        const time = new Date().getTime();
        let {id_murid,metode_pembayaran,jumlah,tgl,id_tryout} = body
        let parameter;
        return new Promise(function(resolve,reject){
          Bayar.findOne({
            where: ({id_tryout:id_tryout, jumlah:jumlah})
          }).then(async (found) => {
              if (found == null) {
                //generate our order id
                  let codeBayar = "TPM-TRYOUT-" + time + "-" + Math.floor(Math.random() * (9999999 - 11111111));
                //generate expired time
                  let batas_waktu = moment().tz("Asia/Jakarta").add(8, 'hours').format("YYYY-MM-DD HH:mm:ss").toString();
                  let tanggal = moment().tz("Asia/Jakarta").format().toString();

                // send to midtrans
                switch (metode_pembayaran) {
                  case 'bri':
                  console.log(batas_waktu);
                  console.log(metode_pembayaran);
                  parameter = {
                    "externalID": codeBayar,
                    "bankCode": "BRI",
                    "name": 'user tesujian',
                    // "id": "598d91b1191029596846047f",
                    // "paymentId": "5f218745736e619164dc8608",
                    // "callbackVirtualAccountId": "598d5f71bf64853820c49a18",
                    // "merchantCode": "26215",
                    // "accountNumber": "262159939380502",
                    // "amount": jumlah,
                    // "transactionTimestamp": tanggal,
                    // "senderName": "TesUjian"
                  };
                  console.log(parameter);

                  const VirtualAcc = x.VirtualAcc;
                  const vaSpecificOptions = {};
                  const va = new VirtualAcc({});

                  va.createFixedVA({
                    'externalID': codeBayar,
                    'bankCode': "BRI",
                    'name': 'user'+id_murid+'',
                  }).then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.owner_id,
                      amount              : chargeResponse.expected_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.expiration_date,
                      transaction_status  : chargeResponse.status,
                      bank                : chargeResponse.bank_code,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                      console.log('biasa xendit');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.id,
                              va_number           :chargeResponse.account_number,
                              payment_type        :chargeResponse.bank_code,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })
                          //end save on our server
                      })
                      .catch((e)=>{
                          console.log(e)
                          reject("Failed Added New Pembayaran")
                      })
                    break;
                  case 'mandiri':
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "echannel",
                    "transaction_details": {
                      "gross_amount": jumlah,
                      "order_id": codeBayar,
                    },
                    "echannel" : {
                        "bill_info1" : "Payment:",
                        "bill_info2" : "Online purchase"
                    }
                  };
                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.bill_key,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                      console.log('biasa');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :chargeResponse.payment_type === 'echannel' ? 'bank_' + chargeResponse.payment_type : chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })


                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                    break;
                  case 'permata':
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "permata",
                    "transaction_details": {
                      "order_id": codeBayar,
                      "gross_amount": jumlah,
                    },
                  };
                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                      console.log('biasa');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :chargeResponse.payment_type === 'echannel' ? 'bank_' + chargeResponse.payment_type : chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })


                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                    break;
                  case 'bni':
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "bank_transfer",
                    "transaction_details": {
                	      "order_id": codeBayar,
                	      "gross_amount": jumlah,
                	  },
                    "bank_transfer":{
                	      "bank": "bni"
                	  }
                  };
                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                      console.log('biasa');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :chargeResponse.payment_type === 'echannel' ? 'bank_' + chargeResponse.payment_type : chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })


                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                    break;
                  case 'bca':
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "bank_transfer",
                	  "transaction_details": {
                      "order_id": codeBayar,
                      "gross_amount": jumlah,
                	  },
                	  "bank_transfer":{
                	      "bank": "bca"
                	  }
                  };

                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                      console.log('biasa');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :chargeResponse.payment_type === 'echannel' ? 'bank_' + chargeResponse.payment_type : chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })


                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                    break;
                  case 'gopay':
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "gopay",
                    "transaction_details": {
              	        "gross_amount": jumlah,
              	        "order_id": codeBayar,
              	    },
                    "gopay": {
              	    }
                  };

                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');

                      console.log('gopay');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :'transfer_' + chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :chargeResponse.actions[0].url,
                              deeplink            :chargeResponse.actions[1].url,
                              status_gopay        :chargeResponse.actions[2].url,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })

                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                    break;
                  default:
                  console.log(metode_pembayaran);
                  parameter = {
                    "payment_type": "bank_transfer",
                    "transaction_details": {
                      "gross_amount": jumlah,
                      "order_id": codeBayar,
                    },
                    "bank_transfer":{
                      "bank": metode_pembayaran
                    }
                  };
                  midtrans.charge(parameter)
                  .then((chargeResponse)=>{
                    const data = {
                      batas_waktu         : batas_waktu,
                      orderId             : chargeResponse.order_id,
                      amount              : chargeResponse.gross_amount,
                      currency            : chargeResponse.currency,
                      transaction_time    : chargeResponse.transaction_time,
                      transaction_status  : chargeResponse.transaction_status,
                      bank                : chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                      actions             : chargeResponse.actions !== null ? chargeResponse.actions : null
                    }
                    console.log(chargeResponse);
                    console.log('======= batas =======');
                    if(chargeResponse.payment_type === 'gopay'){
                      console.log('gopay');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :'transfer_' + chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :chargeResponse.actions[0].url,
                              deeplink            :chargeResponse.actions[1].url,
                              status_gopay        :chargeResponse.actions[2].url,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })
                    }else{
                      console.log('biasa');
                      // create to table bayar, for save on our server
                          Bayar.create({
                              id                  :codeBayar,
                              id_murid            :id_murid,
                              metode_pembayaran   :metode_pembayaran,
                              batas_waktu         :batas_waktu,
                              jumlah              :jumlah,
                              tgl                 :tanggal,
                              status              :false,
                              transaction_id      :chargeResponse.transaction_id,
                              va_number           :chargeResponse.payment_type === 'echannel' ? chargeResponse.bill_key : chargeResponse.permata_va_number !== null ? chargeResponse.permata_va_number : chargeResponse.payment_type === null ? null : chargeResponse.va_numbers,
                              payment_type        :chargeResponse.payment_type === 'echannel' ? 'bank_' + chargeResponse.payment_type : chargeResponse.payment_type,
                              id_tryout           :id_tryout,
                              qrcode              :null,
                              deeplink            :null,
                              status_gopay        :null,
                          }).then((result) => {
                              resolve(data)
                          })
                          .catch((e)=>{
                              reject("Failed Added New Pembayaran")
                          })
                    }

                      //end save on our server
                  })
                  .catch((e)=>{
                      console.log(e)
                      reject("Failed Added New Pembayaran")
                  })
                }

                //end send to midtrans
            }else if(found.status == true){
                reject("Tryout Sudah Dibayar")
            }else if(found.status == false){
                reject("Anda Masih Punya Pembayaran Yang Belum Selesai")
            }
          }).catch((e)=>{
                        console.error('Error occured:',e.message);
            })
        })
    }
    UpdateBayar(id,body){
        let {id_murid,metode_pembayaran,jumlah,tgl} = body
        return new Promise(function(resolve,reject){
            Bayar.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
                found.update({
                    id_murid            :id_murid,
                    metode_pembayaran  :metode_pembayaran,
                    jumlah              :jumlah,
                    tgl                 :tgl,
                    status              :true,
                })
                resolve("Success Update Area")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Pembayaran")
                }else{
                    reject("Failed Update Pembayaran")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
    delete(id){
        return new Promise(function(resolve,reject){
            Bayar.destroy({
                where:{id:id}
            })
            .then((deleted)=>{
                if(deleted){
                    resolve("Success Delete Pembayaran")
                }else{
                    reject("Failed Delete Pembayaran")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    check(body) {
        const { id_murid, id_tryout, jumlah } = body;
        return new Promise(function(resolve,reject){
          if (jumlah==null || jumlah==0) {
            Bayar.findOne({
                where:{id_murid:id_murid,id_tryout:id_tryout}
            })
            .then((result)=>{
                if(result){
                    resolve(result)
                }else{
                    reject(false)
                }
            })
            .catch((err)=>{
                reject(err)
            })
          }else{
            Bayar.findOne({
                where:{id_murid:id_murid,id_tryout:id_tryout,jumlah:jumlah}
            })
            .then((result)=>{
                if(result){
                    resolve(result)
                }else{
                    reject(false)
                }
            })
            .catch((err)=>{
                reject(err)
            })
          }

        })
    }

    updateStatus(id){
        return new Promise(function(resolve,reject){
            Bayar.findOne({
                where:{id:id},
                returning:true
            })
            .then((found)=>{
                if(found){
                    found.update({
                        status:true,
                    })
                    resolve("success")
                }
                _report.sendReportUser(found.id_tryout)
                Tryout.findOne({
                    where: {id: found.id_tryout}
                }).then((res)=>{
                    found.update({
                        status:true,
                    })
                    resolve("Success")
                })
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    saveResponse(body){
        return new Promise(function(resolve,reject){
            Logs.create({
                responseMidtrans : JSON.stringify(body)
            }).then((result) => {
                resolve(body)
            })
            .catch((e)=>{
                reject(e)
            })
        })
    }

    cancelPembayaran(body){
        let {id} = body
        return new Promise(function(resolve,reject) {
            midtrans.transaction.cancel(id)
            .then((response)=>{
                Bayar.destroy({
                    where: {id:id}
                })
                .then((deleted)=>{
                    if(deleted){
                        resolve("Success Cancel Pembayaran")
                    }else{
                        reject("Failed Cancel Pembayaran")
                    }
                })
                .catch((err)=>{
                    reject(err)
                })
            })
        })
    }

    revenue(body) {
        const {status} = body
        return new Promise(function(resolve,reject) {
            let sql = `select IF(SUM(bayars.jumlah) IS NULL,0,SUM(bayars.jumlah)) as revenue from bayars where bayars.status = ${status};`
                db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
                }).then((r)=>resolve(r)).catch((err)=>reject(err))
        })
    }

    getHarga(body){
        return new Promise(function(resolve,reject){
          const { id_skema, harga } = body;
          if (harga==null) {
            Harga.findAll()
            .then((res)=>{
              resolve(res)
            })
            .catch((err)=>{
              reject(err)
            })
          }else{
            Harga.findAll({
              where: {
                harga: harga
              },
            })
            .then((res)=>{
              resolve(res)
            })
            .catch((err)=>{
              reject(err)
            })
          }
        })
    }

    addHarga(body){
        console.log(body)
        let {harga,id_matpel} = body
        return new Promise(function(resolve,reject){
            Harga.create({
                harga : harga,
                id_matpel:id_matpel
            })
            .then((result)=>{
                if(result){
                    resolve("Success Added New Harga")
                }else{
                    reject("Failed Added New Harga")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }

    updateHarga(body){
        const {id,harga,id_matpel} = body
        return new Promise(function(resolve,reject){
            Harga.findOne({
                where:{id:id}
            })
            .then((found)=>{
                found.update({harga:harga,id_matpel:id_matpel})
                resolve("Success Update Harga")
            })
            .then((updated)=>{
                if(updated){
                    resolve("Success Update Harga")
                }else{
                    reject("Failed Update Harga")
                }
            })
            .catch((err)=>{reject(err)})
        })
    }
}

module.exports = Bayars;
