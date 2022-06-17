const route = require("express").Router();
const Matpels = require('@services/Matpels');

let MatpelsService = new Matpels();



/**
 * @typedef Matpel
 * @property {Array.<string>} matpels.required
 */




/**
 * @route GET /matpel
 * @group Matpel
 * @param {integer} id_matpel.query - id matpel
 * @param {integer} id_jenjang.query - id jenjang
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    MatpelsService.getMatpel(req.query)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    debugger
    console.log(err)
    res.json({
      success:false,
      data:err
    })
  })
});



/**
 * @route POST /matpel
 * @group Matpel
 * @param {string} matpel.formData.required - matpel
 * @param {integer} id_jenjang.formData.required - id jenjang
 * @param {integer} jumlah_soal.formData.required - Jumlah Soal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    MatpelsService.newMatpel(req.body)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    debugger
    console.log(err)
    res.json({
      success:false,
      data:err
    })
  })
});

/**
 * Update matpel
 * @route PUT /matpel/{id}
 * @group Matpel
 * @param {string} id.path.required - id
 * @param {string} matpel.formData.required - matpel
 * @param {integer} id_jenjang.formData.required - id jenjang
 * @param {integer} jumlah_soal.formData.required - Jumlah Soal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    MatpelsService.UpdateMatpel(parseInt(req.params.id),req.body)
  .then(result=>{
    res.json({
      success: true,
      data_matpel: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data:err
    })
  })
});


/**
 * Delete matpel
 * @route DELETE /matpel/{id}
 * @group Matpel
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    MatpelsService.delete(parseInt(req.params.id))
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data:err
    })
  })
});


module.exports = route;
