const route = require("express").Router();
const Pondok = require('@services/Pondok');
const Multer = require("multer");
const path = require("path");
const fs = require('fs');
const filterFile = (req,file,cb) => {
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
    cb(null, true);
  }else{
    cb(new Error('File Must Jpeg/jpg/png'), false);
  }
}

const storage = Multer.diskStorage({
  destination: function ( req,file ,cb){
    console.log(path.join(__dirname, './src/public'))
    cb(null, "./src/public");
  },
  filename : function (req,file,cb){
    cb(null,file.originalname)
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
    // fileFilter: filterFile
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
 * @route GET /berhitungSoal
 * @group berhitungSoal
 * @param {integer} id.query - id
 * @param {integer} id_paketPondok.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    PondokService.getBerhitungSoal(req.query)
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
 * @route GET /berhitungSoal/soal
 * @group berhitungSoal
 * @param {integer} id_tryout.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/soal", async (req, res) => {
  PondokService.getSoalBerhitungSoal(req.query)
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
 * @route POST /berhitungSoal
 * @group berhitungSoal
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - Description - eg: Soal Text
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @param {string} waktu.formData - waktu
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", upload.single('kunciJawaban') ,async (req, res) => {
    PondokService.newBerhitungSoal(req.body,req.file)
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
 * Update berhitungSoal
 * @route PUT /berhitungSoal/{id}
 * @group berhitungSoal
 * @param {integer} id.path.required - id
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - soal
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", upload.single('kunciJawaban') ,async (req, res) => {
    PondokService.updateBerhitungSoal(parseInt(req.params.id),req.body,req.file)
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
 * Delete berhitungSoal
 * @route DELETE /berhitungSoal/{id}
 * @group berhitungSoal
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    PondokService.deleteBerhitungSoal(parseInt(req.params.id))
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
 * Update berhitungSoal
 * @route POST /berhitungSoal/updateJawaban
 * @group berhitungSoal
 * @param {integer} id.formData.required - id
 * @param {file} filename.formData - jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/updateJawaban", uploadJawaban.single('filename') ,async (req, res) => {
  PondokService.updateJawabanBerhitungSoal(req.body,req.file)
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
 * Update berhitungSoal
 * @route POST /berhitungSoal/koreksi
 * @group berhitungSoal
 * @param {integer} idJawabanBerhitungSoal.formData.required - id
 * @param {nilai} nilai.formData - nilai
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/koreksi",async (req, res) => {
  PondokService.koreksiBerhitungSoal(req.body)
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
