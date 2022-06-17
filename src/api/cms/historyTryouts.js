const route = require("express").Router();
const Tryouts = require('@services/Tryouts');
const TryoutDetails = require('@services/Tryoutdetails');

let TryoutsService = new Tryouts();
let tryoutDetails = new TryoutDetails();

/**
 * GET History Tryout
 * @route GET /HistoryTryout/
 * @group History Tryout
 * @param {integer} id_murid.query.required - Description - eg: Id Murid
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async(req, res) => {
    TryoutsService.historyTryout(req.query)
        .then(async(result) => {
            var ares = await Promise.all(result.map(async(item) => {
                var details = await tryoutDetails.getTryoutDetails({ id_tryout: item.id });
                console.log(item.id);
                console.log(details);
                var totalSoal = (details != null && details.length > 0) ? details.map(item => item.jumlah_soal).reduce((c, v) => c + v) : 0;
                var totalNilai = (details != null && details.length > 0) ? details.map(item => item.nilai).reduce((c, v) => c + v) / details.length : 0;
                var totalBenar = (details != null && details.length > 0) ? details.map(item => item.totalBenar).reduce((c, v) => c + v) : 0;
                var totalSalah = (details != null && details.length > 0) ? details.map(item => item.totalSalah).reduce((c, v) => c + v) : 0;
                var belumDikerjakan = (parseInt(totalBenar) + parseInt(totalSalah));
                return {...item.dataValues, matpels: details, totalSoal: totalSoal, totalNilai: totalNilai, totalBenar: totalBenar, totalSalah: totalSalah, belumDikerjakan: belumDikerjakan }
            }));
            res.json({
                success: true,
                data_tryout: ares,
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