const route = require("express").Router();
const Soals = require('@services/Soals');

//Upload Image
const Multer = require("multer");
const path = require("path");
const filterFile = (req,file,cb) => {
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
    cb(null, true);
  }else{
    cb(new Error('File Must Jpeg/jpg/png'), false);
  }
}

const storage = Multer.diskStorage({
  destination: function ( req,file ,cb){
    console.log(path.join(__dirname, './public'))
    cb(null, "public");
  },
  filename : function (req,file,cb){
    cb(null, file.originalname)
  }
})

const upload = Multer(
  {
    storage: storage,
  }
)
//Upload Image

let SoalsService = new Soals();



/**
 * @typedef Choice
 * @property {string} value.required
 * @property {integer} isTrue.required
 */

/**
 * @typedef Soal
 * @property {string} soals.required
 * @property {integer} id_type.required
 * @property {integer} id_matpel.required
 * @property {string} jawaban.required
 * @property {integer} isEssay.required
 * @property {Array.<Choice>} choice.required
 */




/**
 * GET Soal
 * @route GET /soals
 * @group Soal
 * @param {integer} id_type.query - Description - eg: id type
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    SoalsService.getSoal(req.query)
  .then(result=>{
    console.log(result)
    res.json({
      success: true,
      data_soal: result,
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
 * GET Soal/soalPakets
 * @route GET /soals/soalPakets
 * @group Soal
 * @param {integer} id_matpel.query - Description - eg: id type
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/soalPakets", async (req, res) => {
    SoalsService.getSoalPaket(req.query)
  .then(result=>{
    console.log(result)
    res.json({
      success: true,
      data_soal: result,
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
 * @route POST /soals
 * @group Soal
 * @consumes multipart/form-data
 * @param {string} soals.formData.required - soal
 * @param {integer} id_type.formData.required - id type soal
 * @param {integer} id_user.formData - id user
 * @param {integer} id_matpel.formData.required - id matpel
 * @param {string} jawaban.formData.required - jawab
 * @param {integer} imgPembahasan.formData.required - imgPembahasan
 * @param {file} picture.formData - pembahasan
 * @param {Choice.model} choice.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", upload.single('picture') ,async (req, res) => {
    SoalsService.newSoal(req.body,req.file)
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
 * @route POST /soals/voice
 * @group Soal
 * @consumes multipart/form-data
 * @param {string} soals.formData - soals
 * @param {file} soalFile.formData - soals File
 * @param {integer} id_type.formData.required - id type soal
 * @param {integer} id_matpel.formData.required - id matpel
 * @param {file} jawaban_benar.formData - jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/voice", upload.any() ,async (req, res) => {
  SoalsService.newSoalVoice(req.body,req.files)
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
 * Update soal
 * @route PUT /soals/{id}
 * @group Soal
 * @param {string} id.path.required - id
 * @param {string} soals.formData.required - soal
 * @param {integer} id_type.formData.required - id type soal
 * @param {integer} id_matpel.formData.required - id matpel
 * @param {string} jawaban.formData.required - jawab
 * @param {integer} imgPembahasan.formData.required - imgPembahasan
 * @param {file} picture.formData.required - pembahasan
 * @param {Choice.model} choice.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", upload.single('picture') , async (req, res) => {
    SoalsService.UpdateSoal(parseInt(req.params.id),req.body,req.file)
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
 * Update soalPaket
 * @route PUT /soalPakets/{id}
 * @group Soal
 * @param {string} id.path.required - id
 * @param {integer} id_type_new.formData - id type new soal
 * @param {integer} id_user.formData - id user soal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    SoalsService.UpdateSoalPaket(parseInt(req.params.id),req.body,req.file)
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
 * Delete soal
 * @route DELETE /soals/{id}
 * @group Soal
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    SoalsService.delete(parseInt(req.params.id))
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
