const route = require("express").Router();
const Pakets = require('@services/Pakets');

let PaketsService = new Pakets();

/**
 * @route GET /paket
 * @group Paket
 * @param {integer} id.query - id
 * @param {integer} isPondok.query - isPondok
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    PaketsService.getPaket(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_paket: result,
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
 * @route GET /paket/list
 * @group Paket
 * @param {integer} id_murid.query - id_murid
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/list", async (req, res) => {
  PaketsService.getPaketList(req.query)
.then(result=>{
  res.json({
    success: true,
    data_paket: result,
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
 * @route POST /paket
 * @group Paket
 * @param {string} nama_paket.formData.required - Nama Paket
 * @param {string} waktu_pengerjaan.formData.required - Waktu Pengerjaan
 * @param {string} tanggal_selesai.formData.required - Tanggal Selesai
 * @param {integer} isPondok.formData.required - isPondok
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    PaketsService.newPaket(req.body)
  .then(result=>{
    res.json({
      success: true,
      data_paket: result,
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
 * Update paket
 * @route PUT /paket/{id}
 * @group Paket
 * @param {string} id.path.required - id
 * @param {string} nama_paket.formData.required - Nama Paket
 * @param {string} waktu_pengerjaan.formData.required - Waktu Pengerjaan
 * @param {string} tanggal_selesai.formData.required - Tanggal Selesai
 * @param {integer} isPondok.formData.required - isPondok
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    PaketsService.UpdatePaket(parseInt(req.params.id),req.body)
  .then(result=>{
    res.json({
      success: true,
      data_paket: result,
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
 * Delete paket
 * @route DELETE /paket/{id}
 * @group Paket
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    PaketsService.delete(parseInt(req.params.id))
  .then(result=>{
    res.json({
      success: true,
      data_paket: result,
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
