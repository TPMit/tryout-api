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
 * Update UpdateJawabans
 * @route PUT /UpdateJawabans
 * @group Tryout Details Soal
 * @param {string} id.formData.required - id
 * @param {string} jawaban_user.formData - Jawaban User
 * @param {string} stringFile.formData - String File
 * @param {file} filename.formData - File
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/", upload.single('filename') ,async (req, res) => {
  TryoutDetailSoalservice.newUpdate(req.body,req.file)
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
