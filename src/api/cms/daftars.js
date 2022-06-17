const route = require("express").Router();
const Daftars = require('@services/Daftars');

let DaftarsService = new Daftars();



/**
 * @typedef Daftar
 * @property {Array.<integer>} id_murid.required
 * @property {integer} id_sekolah_tujuan.required
 * @property {string} tgl_daftar.required
 */




/**
 * GET Daftar
 * @route GET /daftar
 * @group Daftar
 * @param {integer} id.query
 * @param {integer} id_murid.query - Description - eg: id murid
 * @param {integer} id_sekolah_tujuan.query - Description - eg: id sekolah tujuan
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    DaftarsService.getDaftar(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_daftar: result,
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
 * Create Daftar
 * @route POST /daftar
 * @group Daftar
 * @param {string} id_murid.formData.required - id murid
 * @param {string} id_sekolah_tujuan.formData.required - id sekolah tujuan
 * @param {string} tgl_daftar.formData.required - tgl daftar
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", async (req, res) => {
    DaftarsService.newDaftar(req.body)
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
 * Update Daftar
 * @route PUT /daftar/{id}
 * @group Daftar
 * @param {string} id.path.required - id
 * @param {string} id_murid.formData.required - id murid
 * @param {string} id_sekolah_tujuan.formData.required - id sekolah tujuan
 * @param {string} tgl_daftar.formData.required - tgl daftar
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    DaftarsService.UpdateDaftar(parseInt(req.params.id),req.body)
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


/**
 * Delete Daftar
 * @route DELETE /daftar/{id}
 * @group Daftar
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    DaftarsService.delete(parseInt(req.params.id))
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

/**
 * Verify Daftar Code
 * @route GET /daftar/{code}
 * @group Daftar
 * @param {string} code.path.required - code daftar
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/:code",async(req,res) =>{
  DaftarsService.verifyCode(req.params.code)
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
})


module.exports = route;
