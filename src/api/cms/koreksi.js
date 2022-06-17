const route = require("express").Router();
const Tryouts = require('@services/Tryouts');

let TryoutsService = new Tryouts();
/**
 * GET Tryout Koreksi
 * @route GET /koreksiTryout/
 * @group Koreksi Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    TryoutsService.koreksiTryout(req.query)
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
 * GET Tryout Matpel
 * @route GET /koreksiTryout/pondok
 * @group Koreksi Tryout
 * @param {integer} id_tryout.query.required - Description - eg: Id Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/pondok", async (req, res) => {
    TryoutsService.koreksiMatpelPondok(req.query)
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
 * GET Tryout Koreksi
 * @route GET /koreksiTryout/list
 * @group Koreksi Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */
route.get("/list", async (req, res) => {
  TryoutsService.koreksiList(req.query)
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
 * GET Tryout Matpel
 * @route GET /koreksiTryout/matpel
 * @group Koreksi Tryout
 * @param {integer} id_tryout.query.required - Description - eg: Id Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/matpel", async (req, res) => {
    TryoutsService.koreksiMatpel(req.query)
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
 * GET Tryout Soal
 * @route GET /koreksiTryout/soal
 * @group Koreksi Tryout
 * @param {integer} id_tryoutDetail.query.required - Description - eg: Id Tryout Detail
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/soal", async (req, res) => {
    TryoutsService.koreksiSoal(req.query)
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
 * POST Tryout Soal
 * @route POST /koreksiTryout/selesai
 * @group Koreksi Tryout
 * @param {integer} id_tryout.query.required - Description - eg: Id Tryout
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/selesai", async (req, res) => {
    TryoutsService.koreksiSelesai(req.query)
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
 * POST Koreksi Tryout Soal
 * @route POST /koreksiTryout/matpelSelesai
 * @group Koreksi Tryout
 * @param {integer} id_tryoutDetail.query.required - Description - eg: Id Tryout Detail
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/matpelSelesai", async (req, res) => {
  TryoutsService.koreksiMatpelSelesai(req.query)
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
 * POST Tryout Soal
 * @route POST /koreksiTryout/jawaban
 * @group Koreksi Tryout
 * @param {integer} id_tryoutDetailSoal.query.required - Description - eg: Id Tryout Detail Soal
 * @param {integer} status.query.required - Description - eg: Status
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/jawaban", async (req, res) => {
    TryoutsService.koreksiJawaban(req.query)
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
 * POST Tryout Soal
 * @route POST /koreksiTryout/jawabanPondok
 * @group Koreksi Tryout
 * @param {integer} id_tryoutDetail.query.required - Description - eg: Id Tryout Detail
 * @param {integer} nilai.query.required - Description - eg: nilai
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */


route.post("/jawabanPondok", async (req, res) => {
    TryoutsService.koreksiJawabanPondok(req.query)
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
 * POST Tryout Soal
 * @route POST /koreksiTryout/mulai
 * @group Koreksi Tryout
 * @param {integer} id_tryout.query.required - Description - eg: Id Tryout
 * @param {integer} id_guru.query.required - Description - eg: Id Guru
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/mulai", async (req, res) => {
  TryoutsService.startKoreksi(req.query)
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
 * POST Tryout Soal
 * @route POST /koreksiTryout/mulaiMatpel
 * @group Koreksi Tryout
 * @param {integer} id_tryoutDetail.query.required - Description - eg: Id Tryout Detail
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/mulaiMatpel", async (req, res) => {
  TryoutsService.startKoreksiMatpel(req.query)
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

module.exports = route;
