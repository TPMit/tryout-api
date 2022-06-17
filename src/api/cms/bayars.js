const route = require("express").Router();
const Bayars = require('@services/Bayars');

let BayarsService = new Bayars();



/**
 * @typedef Bayar
 * @property {Array.<integer>} id_murid.required
 * @property {string} metode_pembayaran
 * @property {string} jumlah
 * @property {string} tgl
 */




/**
 * GET Bayar
 * @route GET /bayar
 * @group Bayar
 * @param {integer} id.query
 * @param {integer} id_murid.query - Description - eg: id murid
 * @param {string} tgl.query - Description - eg: 2020-09-09
 * @param {string} status.query - Description - eg: 1 or 0
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    BayarsService.getBayar(req.query)
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



/**
 * GET Check Pembayaran
 * @route GET /bayar/check
 * @group Bayar
 * @param {integer} id_murid.query - Description - eg: id murid
 * @param {integer} id_tryout.query - Description - eg: 1 or 0
 * @param {integer} jumlah.query - Description - eg: jumlah
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/check", async (req, res) => {
    BayarsService.check(req.query)
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

/**
 * GET Revenue
 * @route GET /bayar/revenue
 * @group Bayar
 * @param {integer} status.query - Description - eg: 1 or 0
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/revenue", async (req, res) => {
    BayarsService.revenue(req.query)
  .then(result=>{
    res.json({
      success: true,
      data: result[0],
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
 * @route POST /bayar
 * @group Bayar
 * @param {integer} id_murid.formData.required - id_murid
 * @param {integer} id_tryout.formData.required - id_tryout
 * @param {string} metode_pembayaran.formData.required - Metode Pembayaran
 * @param {string} jumlah.formData.required - Jumlah
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    BayarsService.newBayar(req.body)
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
 * Update bayar
 * @route PUT /bayar/{id}
 * @group Bayar
 * @param {string} id.path.required - id
 * @param {string} metode_pembayaran.formData.required - Metode Pembayaran
 * @param {string} jumlah.formData.required - Jumlah
 * @param {string} tgl.formData.required - Tanggal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    BayarsService.UpdateBayar(parseInt(req.params.id),req.body)
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
 * Delete bayar
 * @route DELETE /bayar/{id}
 * @group Bayar
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    BayarsService.delete(req.params.id)
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
 * POST Cancel Pembayaran
 * @route POST /bayar/cancel
 * @group Bayar
 * @param {string} id.query - Description - eg: id bayar
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/cancel", async (req, res) => {
  BayarsService.cancelPembayaran(req.query)
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

/**
 * POST Cancel Pembayaran Xendit
 * @route POST /bayar/cancelXendit
 * @group Bayar
 * @param {string} id.query - Description - eg: id bayar
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/cancelXendit", async (req, res) => {
  BayarsService.cancelPembayaranXendit(req.query)
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

/**
 * POST Create Harga
 * @route POST /bayar/hargaAdd
 * @group Bayar
 * @param {integer} harga.query - Description - eg: id harga
 * @param {integer} id_matpel.query - Description - eg: id id_matpel
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/hargaAdd", async (req, res) => {
  BayarsService.addHarga(req.query)
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

/**
 * GET Get Harga
 * @route GET /bayar/hargaGet
 * @group Bayar
 * @param {integer} id_skema.query - Description - eg: id id_skema
 * @param {integer} harga.query - Description - eg: id harga
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/hargaGet", async (req, res) => {
  BayarsService.getHarga(req.query)
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

/**
 * POST Create Harga
 * @route POST /bayar/hargaUpdate
 * @group Bayar
 * @param {integer} id.query - Description - eg: id id
 * @param {integer} harga.query - Description - eg: id harga
 * @param {integer} id_matpel.query - Description - eg: id id_matpel
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/hargaUpdate", async (req, res) => {
  BayarsService.updateHarga(req.query)
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
