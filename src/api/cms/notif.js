const route = require("express").Router();
const Bayars = require('@services/Bayars');

let BayarsService = new Bayars();

route.post("/", async (req, res) => {
    console.log(req.body);
    BayarsService.saveResponse(req.body)
    .then((result) => {
        if(result.transaction_status == "settlement"){
            BayarsService.updateStatus(result.order_id)
        }else if(result.transaction_status == 'cancel' || result.transaction_status == 'expire'){
            BayarsService.delete(result.order_id)
        }
        res.json({
          success: true,
          data: result,
        });
    })
    .catch((err)=>{
      res.status(400).send(err)
    })
  });

  route.post("/xenditVA", async (req, res) => {
      console.log(req.body);
      BayarsService.saveResponse(req.body)
      .then((result) => {
        console.log(result.external_id);
        BayarsService.updateStatus(result.external_id)
          // if(result.status == "COMPLETED"){
          //   BayarsService.updateStatus(result.external_id)
          // }else if(result.transaction_status == 'cancel' || result.transaction_status == 'expire'){
          //     BayarsService.delete(result.external_id)
          // }
          res.json({
            success: true,
            data: result,
          });
      })
      .catch((err)=>{
        res.status(400).send(err)
      })
    });

module.exports = route;
