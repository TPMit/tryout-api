// @ts-nocheck
const route = require("express").Router();
const Bayars = require('@services/Bayars');
const bayarModel = require("@models").bayars;
const midtransClient = require('midtrans-client');
var cron = require('node-cron');
let BayarsService = new Bayars();

const Reports = require('@services/Reports');
let _report = new Reports();
// _clientKey = 'Mid-client-E82r_sPCFSTCZNgt';
// _serverKey = 'Mid-server-5dXcYNrU0xqjY_X7nXyDH4wS';
// _merchantId = 'G953549076';


const _clientKey = 'SB-Mid-client-AH3w2MSeDznKMu3W';
const _serverKey = 'SB-Mid-server-LOd938541urgmzE_5ttimx9R';
const _merchantId = 'G953549076';
//  cron.schedule("*/10 * * * * *", function() {
//      let core = new midtransClient.CoreApi({
//          isProduction : true,
//          clientKey : _clientKey,
//          serverKey : _serverKey
//        });
//      bayarModel.findAll()
//      .then((bayar)=>{
//          bayar.map((item) => {
//              core.transaction.status(item.id)
//              .then((response)=>{
//                  if(response.transaction_status == "settlement"){
//                      BayarsService.updateStatus(item.id)
//                  }else if(response.transaction_status == 'cancel' || response.transaction_status == 'expire'){
//                      BayarsService.delete(item.id)
//                  }
//              });
//          });
//      })
//  });

cron.schedule('0 16 * * *', () => {
    // _report.bayarReportDay();
    // _report.jumlahProvinsiReport();
    // _report.usage();
    // _report.jenjang();
    _report.createExcel();
  console.log('running a task every Friday at 4:00 pm');
});

module.exports = route;
