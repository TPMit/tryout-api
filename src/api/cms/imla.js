const route = require("express").Router();
const Pondok = require('@services/Pondok');
const Multer = require("multer");
const path = require("path");
const fs = require('fs');
const filterFile = (req,file,cb) => {
  if(file.mimetype == "audio/mp3" || file.mimetype == "image/mp4"){
    cb(null, true);
  }else{
    cb(new Error('File Must Audio'), false);
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

const storageJawaban = Multer.diskStorage({
  destination: function ( req,file ,cb){
    if(!fs.existsSync(process.env.PWD+'/src/public/')){
        fs.mkdirSync(process.env.PWD+'/src/public/', 0766, function(err){
            if(err){
                console.log(err);
                // echo the result back
                response.send("ERROR! Can't make the directory! \n");
            }
        });
    }
    cb(null, process.env.PWD+'/src/public/');
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

const uploadJawaban = Multer(
  {
    storage: storageJawaban,
    // fileFilter: filterFile
  }
)
let PondokService = new Pondok();

/**
 * @route GET /imla
 * @group imla
 * @param {integer} id.query - id
 * @param {integer} id_paketPondok.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    PondokService.getImla(req.query)
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
 * @route GET /imla/soal
 * @group imla
 * @param {integer} id_tryout.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/soal", async (req, res) => {
  PondokService.getSoalImla(req.query)
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
 * @route POST /imla
 * @group imla
 * @consumes multipart/form-data
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {file} soal.formData - Description - eg: Soal Voice
 * @param {file} soal_dua.formData - Description - eg: Soal dua Voice
 * @param {file} soal_tiga.formData - Description - eg: Soal tiga Voice
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/",upload.any(), async (req, res) => {
    PondokService.newImla(req.body,req.files)
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
 * Update Imla
 * @route PUT /imla/detail{id}
 * @group imla
 * @param {integer} id.path.required - id
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {file} soal.formData - soal
 * @param {string} kunciJawaban.formData - Kunci Jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/detail:id",upload.single('soal'), async (req, res) => {
    PondokService.updateImlaDetail(parseInt(req.params.id),req.body,req.file)
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
 * Update Imla
 * @route PUT /imla/kecil{id}
 * @group imla
 * @param {integer} id.path.required - id
 * @param {integer} id_imlaDetail.formData - id_imlaDetail
 * @param {file} soal.formData - soal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/kecil:id",upload.single('soal'), async (req, res) => {
  PondokService.updateImlaKecil(parseInt(req.params.id),req.body,req.file)
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
 * Update Imla
 * @route POST /imla/updateJawaban
 * @group imla
 * @param {integer} id.formData.required - id
 * @param {file} filename.formData - jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/updateJawaban", uploadJawaban.single('filename') ,async (req, res) => {
  PondokService.updateJawabanImla(req.body,req.file)
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
 * Update imla
 * @route POST /imla/koreksi
 * @group imla
 * @param {integer} idJawabanPsikotes.formData.required - id
 * @param {nilai} nilai.formData - nilai
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/koreksi",async (req, res) => {
  PondokService.koreksiImla(req.body)
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
 * Delete imla
 * @route DELETE /imla/{id}
 * @group imla
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    PondokService.deleteImla(parseInt(req.params.id))
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
