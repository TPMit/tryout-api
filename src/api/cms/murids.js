const route = require("express").Router();
const Murid = require('@services/Murids');

//Upload Image
const Multer = require("multer");
const path = require("path");
const filterFile = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(new Error('File Must Jpeg/jpg/png'), false);
    }
}

const storage = Multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(path.join(__dirname, './public'))
        cb(null, "public");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = Multer({
        storage: storage,
        fileFilter: filterFile
    })
    //Upload Image

let MuridService = new Murid();

/**
 * GET Murid
 * @route GET /murid
 * @group Murid
 * @param {integer} id.query
 * @param {integer} id_sekolah.query - Description - eg: id sekolah
 * @param {string} name.query - Description - eg: test
 * @param {string} email.query - Description - eg: test@gmail.com
 * @param {string} password.query - Description - eg:
 * @param {integer} phone.query - Description - eg: 021xxxxx
 * @param {date} tgl_lahir.query. - Description - eg: 2020-09-09
 * @param {string} kelamin.query - Description - eg: laki - laki
 * @param {text} alamat.query - Description - eg: Jl. xxxxxx
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */
route.get("/", async(req, res) => {
    MuridService.getData(req.query)
        .then(result => {
            res.json({
                success: true,
                data_murid: result,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                data: err
            })
        })
});



/**
 * Create murid
 * @route POST /murid
 * @group Murid
 * @param {integer} id_sekolah.formData.required - id sekolah
 * @param {string} name.formData.required test
 * @param {string} email.formData.required test@gmail.com
 * @param {string} password.formData.required  password
 * @param {integer} phone.formData 021xxxxx
 * @param {string} tgl_lahir.formData.required 2020-09-09
 * @param {string} kelamin.formData.required laki - laki
 * @param {string} alamat.formData Jl. xxxxxx
 * @param {string} id_sekolah_tujuan.formData Id Sekolah Tujuan
 * @param {file} picture.formData Picture
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/", upload.single('picture'), async(req, res) => {
    MuridService.createMurid(req.body, req.file)
        .then(result => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            console.log(err)
            res.json({
                success: false,
                data: err
            })
        })
});

/**
 * Update murid
 * @route PUT /murid/{id}
 * @group Murid
 * @param {string} id.path.required - id
 * @param {integer} id_sekolah.formData - id sekolah
 * @param {string} name.formData test
 * @param {string} email.formData test@gmail.com
 * @param {string} password.formData  password
 * @param {integer} phone.formData 021xxxxx
 * @param {string} tgl_lahir.formData 2020-09-09
 * @param {string} kelamin.formData laki - laki
 * @param {string} alamat.formData Jl. xxxxxx
 * @param {file} picture.formData Picture
 * @param {integer} id_sekolah_tujuan.formData - id sekolahtujuan
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", upload.single('picture'), async(req, res) => {
    MuridService.UpdateMurid(parseInt(req.params.id), req.body, req.file)
        .then(result => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                data: err
            })
        })
});


/**
 * Delete murid
 * @route DELETE /murid/{id}
 * @group Murid
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async(req, res) => {
    MuridService.delete(parseInt(req.params.id))
        .then(result => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                data: err
            })
        })
});




module.exports = route;