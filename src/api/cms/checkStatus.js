const route = require("express").Router();
const Bayars = require('@services/Bayars');

let BayarsService = new Bayars();

/**
 * GET CheckStatus
 * @route GET /CheckStatus
 * @group Bayar
 * @param {string} id.query.required - ID
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    BayarsService.getBayarById(req.query)
    .then(result=>{
    res.json({
        success: true,
        data_bayar: result,
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
