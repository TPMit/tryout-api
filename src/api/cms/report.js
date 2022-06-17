// @ts-nocheck
const route = require("express").Router();
const Reports = require('@services/Reports');

const { sendReportUser } = require('@utils/sentNotifications');
let _report = new Reports();

/**
 * GET Report
 * @route GET /report/
 * @group All Report
 * @param {integer} start.query - Description - eg: 2020-01-12
 * @param {integer} end.query - Description - eg: 2020-01-13
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    _report.report(req.query)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    console.log(err)
    res.json({
      success:false,
      data:err
    })
  })
});

/**
 * GET test
 * @route GET /report/test
 * @group All Report
 * @param {integer} start.query - Description - eg: 2020-01-12
 * @param {integer} end.query - Description - eg: 2020-01-13
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/test", async (req, res) => {
    // _report.bayarReportDay();
    // _report.jumlahProvinsiReport();
    // _report.usage();
    // _report.jenjang();
    // _report.progresInput();
  // testing();
  //   res.json({
  //     success: true,
  //     data: {},
  //   });
    _report.sendReportUser(445)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    console.log(err)
    res.json({
      success:false,
      data:err
    })
  })
});

module.exports = route;
