const route = require("express").Router();
const Sekolah = require('@services/Sekolahs');

let SekolahService = new Sekolah();



/**
 * @typedef Sekolah
 * @property {integer} id_area.required
 * @property {Array.<string>} sekolahs.required
 */

/**
 * GET Sekolah
 * @route GET /sekolah
 * @group SEKOLAH
 * @param {integer} id.query
 * @param {integer} id_area.query - Description - eg: id_area
 * @param {integer} id_jenjang.query - Description - eg: id_jenjang
 * @param {integer} active.query - Description - eg: active
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    SekolahService.getData(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_sekolah: result,
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
 * @route POST /sekolah
 * @group SEKOLAH
 * @param {integer} id_area.formData.required - Id Area
 * @param {string} sekolah.formData.required - sekolah
 * @param {integer} kkm.formData.required - kkm
 * @param {integer} id_jenjang.formData.required - id_jenjang
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    SekolahService.createSekolah(req.body)
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
 * Update sekolah
 * @route PUT /sekolah/{id}
 * @group SEKOLAH
 * @param {string} id.path - id
 * @param {string} sekolah.formData - sekolah
 * @param {integer} kkm.formData - kkm
 * @param {integer} id_jenjang.formData - id_jenjang
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    SekolahService.UpdateSekolah(parseInt(req.params.id),req.body)
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
 * Delete sekolah
 * @route DELETE /sekolah/{id}
 * @group SEKOLAH
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    SekolahService.delete(parseInt(req.params.id))
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
