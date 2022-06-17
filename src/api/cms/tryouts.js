// @ts-nocheck
const route = require("express").Router();
const Tryouts = require('@services/Tryouts');
const Pondok = require('@services/Pondok');

let TryoutsService = new Tryouts();
let PondokService = new Pondok();



/**
 * @typedef Tryout
 * @property {Array.<integer>} code_akses.required
 * @property {string} id_murid
 * @property {string} id_guru
 * @property {string} tgl
 */





/**
 * GET Report Tryout
 * @route GET /tryout/report
 * @group Tryout
 * @param {integer} type.query - 1=month;0=year
 * @param {integer} filter.query
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/report", async (req, res) => {
    TryoutsService.report(req.query)
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
 * GET Tryout
 * @route GET /tryout
 * @group Tryout
 * @param {integer} id.query
 * @param {integer} id_murid.query - Description - eg: id murid
 * @param {integer} id_guru.query - Description - eg: id guru
 * @param {integer} id_jenjang.query - Description - eg: id jenjang
 * @param {integer} id_paket.query - Description - eg: id paket
 * @param {string} code_akses.query - Description - eg: code akses
 * @param {string} tgl.query - Description - eg: 2020-09-09
 * @param {string} status.query - Description - eg: 1 or 0
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    TryoutsService.getTryout(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_tryout: result,
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
 * GET Tryout
 * @route GET /tryout/soals
 * @group Tryout
 * @param {integer} id_matpel.query
 * @param {integer} id_tryout_detail.query - Description - eg: id murid
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/soals", async (req, res) => {
    TryoutsService.soalTryout(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_tryout: result,
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
 * GET Tryout
 * @route GET /tryout/report
 * @group Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/report", async (req, res) => {
  TryoutsService.reportTryout()
.then(result=>{
  res.json({
    success: true,
    data_tryout: result,
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
 * GET Tryout
 * @route GET /tryout/info
 * @group Tryout
 * @param {integer} id.query
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/info", async (req, res) => {
    TryoutsService.info(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_tryout: result,
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
 * Create Tryout
 * @route POST /tryout
 * @group Tryout
 * @param {integer} id_murid.formData.required - id murid
 * @param {integer} id_guru.formData - id guru
 * @param {integer} id_jenjang.formData.required - id jenjang
 * @param {integer} id_paket.formData.required - id paket
 * @param {integer} idSekolahTujuan.formData - id sekolah
 * @param {string} tgl.formData.required - Tanggal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", async (req, res) => {
    TryoutsService.newTryout(req.body)
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
 * Update Tryout
 * @route PUT /tryout/{id}
 * @group Tryout
 * @param {string} id.path.required - id
 * @param {integer} id_murid.formData.required - id murid
 * @param {integer} id_guru.formData.required - id guru
 * @param {integer} idSekolahTujuan.formData.required - id sekolah
 * @param {string} tgl.formData.required - Tanggal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    TryoutsService.UpdateTryout(parseInt(req.params.id),req.body)
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
 * Delete tryout
 * @route DELETE /tryout/{id}
 * @group Tryout
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    TryoutsService.delete(parseInt(req.params.id))
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
 * Verify Try Out Code
 * @route GET /tryout/{code_akses}
 * @group Tryout
 * @param {string} code_akses.path.required - code_akses
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/:code_akses",async(req,res) =>{
    TryoutsService.verifyCode(parseInt(req.params.code_akses))
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

/**
 * Finish Tryout
 * @route POST /finishTryout/{id}
 * @group Tryout
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/:id",async(req,res) =>{
  TryoutsService.changeStatus(parseInt(req.params.id))
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




module.exports = route;
