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
    console.log(path.join(__dirname, './public'))
    cb(null, "public");
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
 * @route GET /berhitungAngka
 * @group berhitungAngka
 * @param {integer} id.query - id
 * @param {integer} id_paketPondok.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    PondokService.getBerhitungAngka(req.query)
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
 * @route GET /berhitungAngka/soal
 * @group berhitungAngka
 * @param {integer} id_tryout.query - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/soal", async (req, res) => {
  PondokService.getSoalBerhitungAngka(req.query)
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
 * @route POST /berhitungAngka
 * @group berhitungAngka
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - Description - eg: Soal Text
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @param {string} waktu.formData - waktu
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/",upload.single('kunciJawaban') , async (req, res) => {
    PondokService.newBerhitungAngka(req.body,req.file)
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
 * Update berhitungAngka
 * @route PUT /berhitungAngka/{id}
 * @group berhitungAngka
 * @param {integer} id.path.required - id
 * @param {integer} id_paketPondok.formData - id_paketPondok
 * @param {string} soal.formData - soal
 * @param {file} kunciJawaban.formData - Kunci Jawaban
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id",upload.single('kunciJawaban') , async (req, res) => {
    PondokService.updateBerhitungAngka(parseInt(req.params.id),req.body,req.file)
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
 * Delete berhitungAngka
 * @route DELETE /berhitungAngka/{id}
 * @group berhitungAngka
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    PondokService.deleteBerhitungAngka(parseInt(req.params.id))
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
 * Update berhitungAngka
 * @route POST /berhitungAngka/updateJawaban
 * @group berhitungAngka
 * @param {integer} id.formData.required - id
 * @param {file} filename.formData - File
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/updateJawaban", uploadJawaban.single('filename') ,async (req, res) => {
  PondokService.updateJawabanBerhitungAngka(req.body,req.file)
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
 * Update berhitungAngka
 * @route POST /berhitungAngka/koreksi
 * @group berhitungAngka
 * @param {integer} idJawabanBerhitungAngka.formData.required - id
 * @param {nilai} nilai.formData - nilai
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/koreksi",async (req, res) => {
  PondokService.koreksiBerhitungAngka(req.body)
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
