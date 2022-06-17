const route = require("express").Router();
const Gurus = require('@services/Gurus');

//Upload Image
const Multer = require("multer");
const filterFile = (req,file,cb) => {
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
    cb(null, true);
  }else{
    cb(new Error('File Must Jpeg/jpg/png'), false);
  }
}

const storage = Multer.diskStorage({
  destination: function ( req,file ,cb){
    cb(null, './public/');
  },
  filename : function (req,file,cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = Multer(
  {
    storage: storage,
    fileFilter: filterFile
  }
)
//Upload Image

let GurusService = new Gurus();



/**
 * @typedef Guru
 * @property {Array.<string>} nama.required
 * @property {integer} id_sekolah.required
 * @property {integer} nip.required
 * @property {string} email.required
 * @property {string} phone.required
 * @property {string} password.required
 * @property {file} picture
 */




/**
 * GET Guru
 * @route GET /guru
 * @group Guru
 * @param {integer} id.query
 * @param {integer} id_sekolah.query - Description - eg: id sekolah
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    GurusService.getGuru(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_guru: result,
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
 * Create guru
 * @route POST /guru
 * @group Guru
 * @param {string} nama.formData.required - nama
 * @param {integer} id_sekolah.formData - id_sekolah
 * @param {integer} nip.formData.required - nip
 * @param {string} email.formData.required - email
 * @param {string} phone.formData.required - phone
 * @param {string} password.formData.required - password
 * @param {file} picture.formData - picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", upload.single('picture') , async (req, res) => {
    GurusService.newGuru(req.body,req.file)
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
 * Update guru
 * @route PUT /guru/{id}
 * @group Guru
 * @param {string} id.path.required - id
 * @param {string} nama.formData.required - nama
 * @param {integer} id_sekolah.formData - id_sekolah
 * @param {integer} nip.formData.required - nip
 * @param {string} email.formData.required - email
 * @param {string} phone.formData.required - phone
 * @param {string} password.formData.required - password
 * @param {file} picture.formData - picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id",upload.single('picture'), async (req, res) => {
    GurusService.UpdateGuru(parseInt(req.params.id),req.body,req.file)
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
 * Delete guru
 * @route DELETE /guru/{id}
 * @group Guru
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    GurusService.delete(parseInt(req.params.id))
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
