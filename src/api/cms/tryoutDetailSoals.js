const route = require("express").Router();
const TryoutDetailSoals = require('@services/Tryoutdetailsoals');

//Upload Image
const Multer = require("multer");

const storage = Multer.diskStorage({
  destination: function ( req,file ,cb){
    cb(null, 'public');
  },
  filename : function (req,file,cb){
    cb(null, new Date().getTime() +'-'+ file.originalname)
  }
})

const upload = Multer(
  {
    storage: storage,
  }
)
//Upload Image

let TryoutDetailSoalservice = new TryoutDetailSoals();


/**
 * GET Tryout Detail Soal
 * @route GET /tryoutdetailsoal
 * @group Tryout Details Soal
 * @param {integer} id.query
 * @param {integer} id_tryoutDetail.query - Description - eg: id tryout detail
 * @param {integer} id_soal.query - Description - eg: id soal
 * @param {string} status.query - Description - eg: 1 or 0
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
  TryoutDetailSoalservice.getTryoutDetailsoals(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_tryout_detail_soal: result,
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
 * Create Tryout Details Soals
 * @route POST /tryoutdetailsoal
 * @group Tryout Details Soal
 * @param {integer} id_tryoutDetail.formData.required - id tryout detail
 * @param {integer} id_soal.formData.required - id soal
 * @param {string} jawaban_user.formData.required - Jawaban User
 * @param {file} filename.formData - File
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", upload.single('filename') ,async (req, res) => {
  TryoutDetailSoalservice.newTryoutDetailSoals(req.body,req.file)
  .then(result=>{
    res.json({
      success: true,
      data_tods: result,
    });
  })
  .catch((err)=>{
    debugger
    console.log(err)
    res.json({
      success:false,
      data_tods:err
    })
  })
});

/**
 * Update Tryout Detail Soals
 * @route PUT /tryoutdetailsoal/{id}
 * @group Tryout Details Soal
 * @param {string} id.path.required - id
 * @param {integer} id_tryoutDetail.formData.required - id tryout detail
 * @param {integer} id_soal.formData.required - id soal
 * @param {string} jawaban_user.formData.required - Jawaban User
 * @param {file} filename.formData - File
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", upload.single('filename') ,async (req, res) => {
  TryoutDetailSoalservice.UpdateTryoutDetailSoals(parseInt(req.params.id),req.body,req.file)
  .then(result=>{
    res.json({
      success: true,
      data_tods: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data_tods:err
    })
  })
});


/**
 * Delete Tryout Details Soal
 * @route DELETE /tryoutdetailsoal/{id}
 * @group Tryout Details Soal
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
  TryoutDetailSoalservice.delete(parseInt(req.params.id))
  .then(result=>{
    res.json({
      success: true,
      data_tods: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data_tods:err
    })
  })
});


module.exports = route;
