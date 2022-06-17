const route = require("express").Router();
const Pondok = require('@services/Pondok');


let Pondokservice = new Pondok();


/**
 * GET FinishDetailPondoks
 * @route GET /finishdetailpondoks
 * @group Finish Detail Pondoks
 * @param {integer} id_tryout.query - Description - eg: id tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    Pondokservice.finishDetailPondoks(req.query)
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
