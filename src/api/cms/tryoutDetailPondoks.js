const route = require("express").Router();
const Pondok = require('@services/Pondok');


let Pondokservice = new Pondok();


/**
 * GET TryoutDetailPondoks
 * @route GET /tryoutdetailpondoks
 * @group Tryout Detail Pondoks
 * @param {integer} id_tryout.query - Description - eg: id tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
  console.log('test'+req.query);
    Pondokservice.getDetailPondoks(req.query)
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
 * Finish Tryout Pondok
 * @route POST /finishTryoutPondok/{id}
 * @group Tryout Detail Pondoks
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/:id",async(req,res) =>{
  Pondokservice.changeStatusPondok(parseInt(req.params.id))
.then(result=>{
  res.json({
    success: true,
    data_code_akses: result,
  });
})
.catch((err)=>{
  res.json({
    success:false,
    data:err
  })
})
})


//
//
//
// /**
//  * Create TryoutDetails
//  * @route POST /tryoutdetails
//  * @group Tryout Details
//  * @param {integer} id_tryout.formData.required - id tryout
//  * @param {integer} id_matpel.formData.required - id matpel
//  * @param {integer} nilai.formData.required - Nilai
//  * @returns {object} 200 - Success
//  * @returns {object} 400 - Error
//  * @security JWT
//  */
//
// route.post("/", async (req, res) => {
//     TryoutDetailservice.newTryoutDetails(req.body)
//   .then(result=>{
//     res.json({
//       success: true,
//       data_tryout_detail: result,
//     });
//   })
//   .catch((err)=>{
//     res.json({
//       success:false,
//       data:err
//     })
//   })
// });
//
// /**
//  * Update TryoutDetails
//  * @route PUT /tryoutdetails/{id}
//  * @group Tryout Details
//  * @param {string} id.path.required - id
//  * @param {integer} id_tryout.formData.required - id tryout
//  * @param {integer} id_matpel.formData.required - id matpel
//  * @param {integer} nilai.formData.required - Nilai
//  * @returns {object} 200 - Success
//  * @returns {object} 400 - Error
//  * @security JWT
//  */
//
// route.put("/:id", async (req, res) => {
//     TryoutDetailservice.UpdateTryoutDetails(parseInt(req.params.id),req.body)
//   .then(result=>{
//     res.json({
//       success: true,
//       data: result,
//     });
//   })
//   .catch((err)=>{
//     res.json({
//       success:false,
//       data:err
//     })
//   })
// });
//
//
// /**
//  * Delete TryoutDetails
//  * @route DELETE /tryoutdetails/{id}
//  * @group Tryout Details
//  * @param {string} id.path.required - id
//  * @returns {object} 200 - Success
//  * @returns {object} 400 - Error
//  * @security JWT
//  */
//
// route.delete("/:id", async (req, res) => {
//     TryoutDetailservice.delete(parseInt(req.params.id))
//   .then(result=>{
//     res.json({
//       success: true,
//       data: result,
//     });
//   })
//   .catch((err)=>{
//     res.json({
//       success:false,
//       data:err
//     })
//   })
// });
//
// /**
//  * Finish TryoutDetails
//  * @route POST /finishTryoutDetail/{id}
//  * @group Tryout Details
//  * @param {string} id.path.required - id
//  * @returns {object} 200 - Success
//  * @returns {object} 400 - Error
//  * @security JWT
//  */
//
// route.post("/:id", async (req, res) => {
//     TryoutDetailservice.finishTryout(parseInt(req.params.id))
//   .then(result=>{
//     res.json({
//       success: true,
//       data: result,
//     });
//   })
//   .catch((err)=>{
//     res.json({
//       success:false,
//       data:err
//     })
//   })
// });
//
// /**
//  * Get Tryout Finish
//  * @route GET /finishTryoutDetail/{id_tryout}
//  * @group Tryout Details
//  * @param {integer} id_tryout.path.required - Id Tryout
//  * @param {integer} id_tryoutDetail.query.required - Id Tryout Detail
//  * @returns {object} 200 - Success
//  * @returns {object} 400 - Error
//  * @security JWT
//  */
//
// route.get("/:id_tryout",async(req,res) =>{
//     TryoutDetailservice.TryoutFinish(parseInt(req.params.id_tryout),req.query)
//   .then(result=>{
//     res.json({
//       success: true,
//       data_tryout: result,
//     });
//   })
//   .catch((err)=>{
//     debugger
//     console.log(err)
//     res.json({
//       success:false,
//       data:err
//     })
//   })
// })

module.exports = route;
