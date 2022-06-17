const route = require("express").Router();
const Jurusans = require('@services/Jurusans');

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
    cb(null, new Date().getTime() +'-'+ file.originalname)
  }
})

const upload = Multer(
  {
    storage: storage,
    fileFilter: filterFile
  }
)
//Upload Image

let JurusanService = new Jurusans();



/**
 * @typedef Jurusans
 * @property {Array.<integer>} id_jenjang.required
 * @property {Array.<string>} jurusan.required
 */




/**
 * @route GET /jurusan
 * @group Jurusan
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    JurusanService.getJurusan()
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
 * @route POST /jurusan
 * @group Jurusan
 * @param {integer} id_jenjang.formData.required - id jenjang
 * @param {string} jurusan.formData.required - jurusan
 * @param {file} icon.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/",upload.single('icon') , async (req, res) => {
    JurusanService.newJurusan(req.body,req.file)
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
 * Update jurusan
 * @route PUT /jurusan/{id}
 * @group Jurusan
 * @param {string} id.path.required - id
 * @param {integer} id_jenjang.formData.required - id jenjang
 * @param {string} jurusan.formData.required - jurusan
 * @param {file} icon.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id",upload.single('icon') , async (req, res) => {
    JurusanService.UpdateJurusan(parseInt(req.params.id),req.body,req.file)
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
 * Delete jurusan
 * @route DELETE /jurusan/{id}
 * @group Jurusan
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    JurusanService.delete(parseInt(req.params.id))
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
