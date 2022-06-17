const route = require("express").Router();
const Jenjangs = require('@services/Jenjangs');

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

let JenjangsService = new Jenjangs();



/**
 * @typedef Jenjang
 * @property {Array.<string>} jenjang.required
 */




/**
 * @route GET /jenjang
 * @group Jenjang
 * @param {integer} id.query - id
 * @param {integer} id_jenjang.query - jenjang kedua
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    JenjangsService.getJenjang(req.query)
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
 * @route POST /jenjang
 * @group Jenjang
 * @param {string} jenjang.formData.required - jenjang
 * @param {file} icon.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", upload.single('icon') ,async (req, res) => {
    JenjangsService.newJenjang(req.body,req.file)
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
 * Update jenjang
 * @route PUT /jenjang/{id}
 * @group Jenjang
 * @param {string} id.path.required - id
 * @param {string} jenjang.formData.required - jenjang
 * @param {file} icon.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id",upload.single('icon') , async (req, res) => {
    JenjangsService.UpdateJenjang(parseInt(req.params.id),req.body,req.file)
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
 * Delete jenjang
 * @route DELETE /jenjang/{id}
 * @group Jenjang
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    JenjangsService.delete(parseInt(req.params.id))
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
 * @route GET /jenjang/report
 * @group Jenjang
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/report", async (req, res) => {
    JenjangsService.report()
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
