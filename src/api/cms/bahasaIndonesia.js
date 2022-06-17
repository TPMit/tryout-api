const route = require("express").Router();
const Pondok = require('@services/Pondok');
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
    cb(null,file.originalname)
  }
})

const upload = Multer(
  {
    storage: storage,
    // fileFilter: filterFile
  }
)
let PondokService = new Pondok();

/**
 * @route GET /bahasaIndonesia
 * @group bahasaIndonesia
 * @param {integer} id.query - id
 * @param {integer} id_paketPondok.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    PondokService.getBahasaIndonesia(req.query)
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
 * @route GET /bahasaIndonesia/soal
 * @group bahasaIndonesia
 * @param {integer} id_tryout.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/soal", async (req, res) => {
  PondokService.getSoalBahasaIndonesia(req.query)
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
 * @route POST /bahasaIndonesia
 * @group bahasaIndonesia
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - Description - eg: Soal Text
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @param {integer} waktu.formData - waktu
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", upload.single('kunciJawaban') ,async (req, res) => {
    PondokService.newBahasaIndonesia(req.body,req.file)
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
 * Update bahasaIndonesia
 * @route PUT /bahasaIndonesia/{id}
 * @group bahasaIndonesia
 * @param {integer} id.path.required - id
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - soal
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @param {integer} waktu.formData - waktu
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id",upload.single('kunciJawaban') , async (req, res) => {
    PondokService.updateBahasaIndonesia(parseInt(req.params.id),req.body,req.file)
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
 * Delete bahasaIndonesia
 * @route DELETE /bahasaIndonesia/{id}
 * @group bahasaIndonesia
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    PondokService.deleteBahasaIndonesia(parseInt(req.params.id))
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
 * Update bahasaIndonesia
 * @route POST /bahasaIndonesia/updateJawaban
 * @group bahasaIndonesia
 * @param {integer} id.formData.required - id
 * @param {file} filename.formData - File
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/updateJawaban", upload.single('filename') ,async (req, res) => {
  PondokService.updateJawabanBahasaIndonesia(req.body,req.file)
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
 * Update bahasaIndonesia
 * @route POST /bahasaIndonesia/koreksi
 * @group bahasaIndonesia
 * @param {integer} idJawabanBahasaIndonesia.formData.required - id
 * @param {nilai} nilai.formData - nilai
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/koreksi",async (req, res) => {
  PondokService.koreksiBahasaIndonesia(req.body)
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
