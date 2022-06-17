const route = require("express").Router();
const Tryouts = require('@services/Tryouts');

let TryoutsService = new Tryouts();

/**
 * GET Rasio Grades Tryout
 * @route GET /RasioGrades/
 * @group Rasio Grades Tryout
 * @param {integer} id_murid.query.required - Description - eg: Id Murid
 * @param {integer} id.query.required - Description - eg: Id Tryout
 * @param {integer} id_area.query - Description - eg: Id Area
 * @param {integer} idSekolahTujuan.query - Description - eg: idSekolahTujuan
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async(req, res) => {
    TryoutsService.rasioGrades(req.query)
        .then(result => {
            console.log("ssss")
            res.json({
                success: true,
                data_tryout: result,
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

module.exports = route;
