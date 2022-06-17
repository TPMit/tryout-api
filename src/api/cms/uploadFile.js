const route = require("express").Router();
//Upload Image
const Multer = require("multer");
const path = require("path");
const fs = require('fs');
const pictureDirectory = path.join(__dirname, 'public');

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


/**
  * get all picture
  * @route GET /upload
  * @group Upload
  * @returns {object} 200 - Success
  * @returns {object} 400 - Error
*/
  route.get("/", async (req, res) => {
    let dataPic = fs.readdirSync('./public', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)
    res.json({
      success: true,
      data: dataPic,
    });
  });
/**
 * upload Picture
 * @route POST /upload
 * @group Upload
 * @param {file} picture.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", upload.single('picture') , async (req, res) => {
  console.log(pictureDirectory)
  res.json({
    success: true,
    data: req.file.filename,
  });
});

module.exports = route;
