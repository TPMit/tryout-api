// @ts-nocheck
const db = require("@models");
const { sentReportProgress,sendReportUser } = require('@utils/sentNotifications');
var excel = require('excel4node');

var fs = require("fs");
// var XLSXChart = require("./../chart");
var XLSXChart = require ("xlsx-chart");
var xlsxChart = new XLSXChart();
class Reports {
    constructor() {
    }
    getChartPerjenjang() {
        return new Promise((resolve, reject) => {
            var Quiche = require('quiche');
            var bar = new Quiche('bar');
            // bar.setWidth(500);
            // bar.setHeight(300);
            bar.setTitle('Some title or something');
            bar.setBarStacked(); // Stacked chart
            bar.setBarWidth(0);
            bar.setBarSpacing(6); // 6 pixles between bars/groups
            bar.setLegendBottom(); // Put legend at bottom
            bar.setTransparentBackground(); // Make background transparent

            bar.addData([19, 19, 21, 14, 19, 11, 10, 18, 19, 30], 'Foo', 'FF0000');

            bar.setAutoScaling(); // Auto scale y axis
            bar.addAxisLabels('x', ['SD', 'SMP', 'SMA IPA', 'SMA IPS', 'SMK AKUTANSI', 'SMK PARIWISATA', 'SMK TEKNIK', 'PTN SAINTEK', 'PTN SOSHUM', 'PONDOK']);

            var imageUrl = bar.getUrl(true); // First param controls http vs. https
            resolve(imageUrl);
       })
        // var Datajenjang = await this.jenjang();
        // let opt = {
        //         chart: "column",
        //         titles: [
        //             "Total",
        //         ],
        //         fields: [
        //             "Field 1",
        //             "Field 2",
        //             "Field 3",
        //             "Field 4"
        //         ],
        //         data: {
        //             "Title 1": {
        //                 "Field 1": 5,
        //                 "Field 2": 10,
        //                 "Field 3": 15,
        //                 "Field 4": 20
        //             },
        //             "Title 2": {
        //                 "Field 1": 10,
        //                 "Field 2": 5,
        //                 "Field 3": 20,
        //                 "Field 4": 15
        //             },
        //             "Title 3": {
        //                 "Field 1": 20,
        //                 "Field 2": 15,
        //                 "Field 3": 10,
        //                 "Field 4": 5
        //             }
        //         },
        //         chartTitle: "Grafik Tryout yg dikerjakan Perjenjang"
        //     }
    }
    // testChart() {
    //     return new Promise((resolve, reject) => {
    //     let opts = {
    //         charts: [{
    //             chart: "column",
    //             titles: [
    //                 "Title 1",
    //                 "Title 2",
    //                 "Title 3"
    //             ],
    //             fields: [
    //                 "Field 1",
    //                 "Field 2",
    //                 "Field 3",
    //                 "Field 4"
    //             ],
    //             data: {
    //                 "Title 1": {
    //                     "Field 1": 5,
    //                     "Field 2": 10,
    //                     "Field 3": 15,
    //                     "Field 4": 20
    //                 },
    //                 "Title 2": {
    //                     "Field 1": 10,
    //                     "Field 2": 5,
    //                     "Field 3": 20,
    //                     "Field 4": 15
    //                 },
    //                 "Title 3": {
    //                     "Field 1": 20,
    //                     "Field 2": 15,
    //                     "Field 3": 10,
    //                     "Field 4": 5
    //                 }
    //             },
    //             chartTitle: "Grafik Tryout yg dikerjakan Perjenjang"
    //         }, {
    //             chart: "column",
    //             titles: [
    //                 "Title 1",
    //                 "Title 2",
    //                 "Title 3"
    //             ],
    //             fields: [
    //                 "Field 1",
    //                 "Field 2",
    //                 "Field 3",
    //                 "Field 4"
    //             ],
    //             data: {
    //                 "Title 1": {
    //                     "Field 1": 5,
    //                     "Field 2": 10,
    //                     "Field 3": 15,
    //                     "Field 4": 20
    //                 },
    //                 "Title 2": {
    //                     "Field 1": 10,
    //                     "Field 2": 5,
    //                     "Field 3": 20,
    //                     "Field 4": 15
    //                 },
    //                 "Title 3": {
    //                     "Field 1": 20,
    //                     "Field 2": 15,
    //                     "Field 3": 10,
    //                     "Field 4": 5
    //                 }
    //             },
    //             chartTitle: "Title 2"
    //         }, {
    //             chart: "column",
    //             titles: [
    //                 "Title 1",
    //                 "Title 2",
    //             ],
    //             fields: [
    //                 "Field 1",
    //                 "Field 2",
    //                 "Field 3",
    //             ],
    //             data: {
    //                 "Title 1": {
    //                     "Field 1": 15,
    //                     "Field 2": 30,
    //                     "Field 3": 45,
    //                 },
    //                 "Title 2": {
    //                     "Field 1": 5,
    //                     "Field 2": 2,
    //                     "Field 3": 10
    //                 }
    //             },
    //             chartTitle: "Title 3"
    //         }]
    //     };
    //     xlsxChart.generate (opts, function (err, data) {
    //         if (err) {
    //             console.error (err);
    //         } else {
    //             fs.writeFileSync ("line.xlsx", data);
    //             console.log ("line.xlsx created.");
    //         };
    //     });
    //         resolve("hhlo")
    //     })
    // }

    createExcel() {
        return new Promise(async (resolve, reject) => {
            var Datajenjang = await this.jenjang();
            var DataBayar = await this.bayarReportDay();
            var DataProvinsi = await this.jumlahProvinsiReport();
            var DataUsage = await this.dataUsage();
            try {
                var workbook = new excel.Workbook();
                // Add Worksheets to the workbook
                var worksheetJenjang = workbook.addWorksheet('Laporan per Jenjang');
                var worksheetBayar = workbook.addWorksheet('Laporan Transaksi Pembayaran');
                var worksheetProvinsi = workbook.addWorksheet('Laporan User per Provinsi');
                var worksheetUsage = workbook.addWorksheet('Penggunaan (Usage)');

                // Create a reusable style
                var styleTitle = workbook.createStyle({
                    font: {
                        color: '#000000',
                        size: 16,
                        bold: true,
                    }
                });
                var styleHead = workbook.createStyle({
                    font: {
                        color: '#000000',
                        size: 12,
                        bold: true,
                    },
                    alignment: {
                        wrapText: false,
                        horizontal: 'center',
                        shrinkToFit: true
                    },
                    border: {
                        left: {
                            style: "thin",
                            color : "#000000"
                        },
                        right: {
                            style: "thin",
                            color : "#000000"
                        },
                        top: {
                            style: "thin",
                            color : "#000000"
                        },
                        bottom: {
                            style: "thin",
                            color : "#000000"
                        },
                    }
                });
                var stylebiasa = workbook.createStyle({
                    font: {
                        color: '#000000',
                        size: 12,
                        bold: false,
                    },
                    alignment: {
                        wrapText: false,
                        horizontal: 'center',
                        shrinkToFit: true
                    },
                    border: {
                        left: {
                            style: "thin",
                            color : "#000000"
                        },
                        right: {
                            style: "thin",
                            color : "#000000"
                        },
                        top: {
                            style: "thin",
                            color : "#000000"
                        },
                        bottom: {
                            style: "thin",
                            color : "#000000"
                        },
                    }
                });

                //start jenjang
                // Set value of cell A1 to 100 as a number type styled with paramaters of style
                worksheetJenjang.cell(2, 1).string("Laporan Tryout yang dikerjakan Perjenjang").style(styleTitle);

                var cellRow = [5, 1];
                // Set value of cell B1 to 300 as a number type styled with paramaters of style
                worksheetJenjang.cell(4, 1).string("Nama Jenjang").style(styleHead);
                worksheetJenjang.cell(4, 2).string("Total").style(styleHead);
                var totalJenjang = 0;
                for (var i = 0; i < Datajenjang.length; i++) {
                    worksheetJenjang.cell(cellRow[0] + i, 1).string(Datajenjang[i].jenjang).style(stylebiasa);
                    worksheetJenjang.cell(cellRow[0] + i, 2).number(Datajenjang[i].total).style(stylebiasa);
                    totalJenjang += Datajenjang[i].total;
                }
                // Set value of cell C1 to a formula styled with paramaters of style
                worksheetJenjang.cell(5 + Datajenjang.length, 1).string("Total : ").style(styleHead);
                worksheetJenjang.cell(5 + Datajenjang.length, 2).number(totalJenjang).style(styleHead);
                //end jenjang

                //start bayar
                // Set value of cell A1 to 100 as a number type styled with paramaters of style
                worksheetBayar.cell(2, 1).string("Laporan Transaksi Pembayaran").style(styleTitle);

                // Set value of cell B1 to 300 as a number type styled with paramaters of style
                worksheetBayar.cell(4, 1).string("Order ID").style(styleHead);
                worksheetBayar.cell(4, 2).string("User Name").style(styleHead);
                worksheetBayar.cell(4, 3).string("Date").style(styleHead);
                worksheetBayar.cell(4, 4).string("Jumlah").style(styleHead);
                worksheetBayar.cell(4, 5).string("Payment Status").style(styleHead);
                worksheetBayar.cell(4, 6).string("Payment Method").style(styleHead);
                worksheetBayar.cell(4, 7).string("VA Number").style(styleHead);
                var totalBayar = 0;
                for (var i = 0; i < DataBayar.length; i++) {
                    worksheetBayar.cell(5 + i, 1).string(DataBayar[i].id).style(stylebiasa);
                    worksheetBayar.cell(5 + i, 2).string(DataBayar[i].name).style(stylebiasa);
                    worksheetBayar.cell(5 + i, 3).date(DataBayar[i].tgl).style(stylebiasa).style({ numberFormat: 'yyyy-MMMM-dd' });;
                    worksheetBayar.cell(5 + i, 4).string(DataBayar[i].jumlah).style(stylebiasa);
                    worksheetBayar.cell(5 + i, 5).string(DataBayar[i].status ? "PAID" : "WAITING PAYMENT").style(stylebiasa);
                    worksheetBayar.cell(5 + i, 6).string(DataBayar[i].payment_type + "|" + DataBayar[i].metode_pembayaran).style(stylebiasa);
                    worksheetBayar.cell(5 + i, 7).string(DataBayar[i].va_number).style(stylebiasa);
                    totalBayar += parseInt(DataBayar[i].jumlah);
                }
                // Set value of cell C1 to a formula styled with paramaters of style
                worksheetBayar.cell(5 + DataBayar.length, 6).string("Total : ").style(styleHead);
                worksheetBayar.cell(5 + DataBayar.length, 7).number(totalBayar).style(styleHead);
                //end bayar

                //start provinsi
                // Set value of cell A1 to 100 as a number type styled with paramaters of style
                worksheetProvinsi.cell(2, 1).string("Report User per Provinsi").style(styleTitle);

                // Set value of cell B1 to 300 as a number type styled with paramaters of style
                worksheetProvinsi.cell(4, 1).string("Nama Provinsi").style(styleHead);
                worksheetProvinsi.cell(4, 2).string("Total User").style(styleHead);
                var totalProvinsi = 0;
                for (var i = 0; i < DataProvinsi.length; i++) {
                    worksheetProvinsi.cell(5 + i, 1).string(DataProvinsi[i].area).style(stylebiasa);
                    worksheetProvinsi.cell(5 + i, 2).number(parseInt(DataProvinsi[i].murid)).style(stylebiasa);
                    totalProvinsi += parseInt(DataProvinsi[i].murid);
                }
                // Set value of cell C1 to a formula styled with paramaters of style
                worksheetProvinsi.cell(5 + DataProvinsi.length, 1).string("Total : ").style(styleHead);
                worksheetProvinsi.cell(5 + DataProvinsi.length, 2).number(totalProvinsi).style(styleHead);
                //end provinsi

                //start usage
                var colsamping = 1;
                for (var i = 0; i < DataUsage.length; i++) {
                    worksheetUsage.cell(2, colsamping,2, colsamping + 1).string(DataUsage[i].name).style(styleHead);
                    worksheetUsage.cell(3, colsamping).string("Nama User").style(styleHead);
                    worksheetUsage.cell(3, colsamping + 1).string("Total Pembelian Paket").style(styleHead);
                    var totalBro = 0;
                    if (DataUsage[i].data.length > 0) {
                        for (var k = 0; k < DataUsage[i].data.length; k++){
                            worksheetUsage.cell(4+k, colsamping).string(DataUsage[i].data[k].name).style(stylebiasa);
                            worksheetUsage.cell(4+k, colsamping + 1).number(parseInt(DataUsage[i].data[k].total)).style(stylebiasa);
                            totalBro += parseInt(DataUsage[i].data[k].total);
                        }
                    }
                    worksheetUsage.cell(5 + DataUsage[i].data.length, colsamping).string("Total : ").style(styleHead);
                    worksheetUsage.cell(5 + DataUsage[i].data.length, colsamping + 1).number(totalBro).style(styleHead);
                    colsamping += 2;
                }
                //end usage
                workbook.write('Laporan_Perhari.xlsx');
                sentReportProgress();
                resolve("hello")
            } catch (ex) {
                reject(ex);
            }
        })
    }
    report(body) {
        return new Promise(function (resolve, reject) {
            Promise.all([this.registerReport(body), this.tryoutReport(body), this.bayarReport(body)]).then((v) => resolve({ register: v[0], tryout: v[1], bayar: v[2] })).catch((e) => reject(e))
        }.bind(this))
    }
    registerReport(body) {
        const { start, end } = body;
        return new Promise((resolve, reject) => {
            let sql = `select murids.name,murids.email,murids.createdAt,sekolahs.nama,areas.area from murids inner join sekolahs on sekolahs.id = murids.id inner join areas on areas.id = sekolahs.id_area;`
            if (start != undefined && end != undefined) {
                sql = `select murids.name,murids.email,murids.createdAt,sekolahs.nama,areas.area from murids inner join sekolahs on sekolahs.id = murids.id inner join areas on areas.id = sekolahs.id_area murids.createdAt >= "${start}" and murids.createdAt <= "${end}";`
            }
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }
    tryoutReport(body) {
        const { start, end } = body;
        return new Promise((resolve, reject) => {
            let sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket from tryouts inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket;`
            if (start != undefined && end != undefined) {
                sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket from tryouts inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket tryouts.createdAt >= "${start}" and tryouts.createdAt <= "${end}";`
            }
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }
    bayarReport(body) {
        const { start, end } = body;
        return new Promise((resolve, reject) => {
            let sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket,bayars.* from bayars inner join tryouts on tryouts.id = bayars.id_tryout  inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket;`
            if (start != undefined && end != undefined) {
                sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket,bayars.* from bayars inner join tryouts on tryouts.id = bayars.id_tryout  inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket bayars.createdAt >= "${start}" and bayars.createdAt <= "${end}";`
            }
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => resolve(r)).catch((err) => reject(err))
        })
    }
    bayarReportDay() {
        return new Promise((resolve, reject) => {
            var d = new Date();
            var day = d.getDate();
            // let sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket,bayars.* from bayars inner join tryouts on tryouts.id = bayars.id_tryout  inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket where day(bayars.tgl)=19;`
            let sql = `select murids.name,tryouts.tgl,jenjangs.jenjang,pakets.nama_paket,bayars.* from bayars inner join tryouts on tryouts.id = bayars.id_tryout  inner join murids on murids.id = tryouts.id_murid inner join jenjangs on jenjangs.id = tryouts.jenjang inner join pakets on pakets.id = tryouts.id_paket;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { //sentReportPembayaran(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
    jumlahProvinsiReport() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT 
    tryout.indonesia_provinces.name as area,
    (SELECT 
            COUNT(tryout.murids.id)
        FROM
            tryout.murids
                INNER JOIN
            tryout.sekolahs ON tryout.sekolahs.id = tryout.murids.id_sekolah
                INNER JOIN
            tryout.areas ON tryout.areas.id = tryout.sekolahs.id_area
        WHERE
            tryout.areas.province_id = tryout.indonesia_provinces.id) AS murid
FROM
    tryout.indonesia_provinces;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => {
                //sentReportProvinsi(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
    getprovinsi() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT tryout.indonesia_provinces.id,tryout.indonesia_provinces.name FROM tryout.indonesia_provinces;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => {  resolve(r) }).catch((err) => reject(err))
        })
    }
    dataUsage() {
        return new Promise(async (resolve, reject) => {
            var provinsi = await this.getprovinsi();

            if (provinsi) {
                Promise.all(provinsi.map( async (t) => {
                    var a = await this.usegaProvinsiUser(t.id)
                    return {id:t.id,name:t.name,data:a};
                })).then((r) => {
                    resolve(r);
                });
            } else {
                reject("provinsi kosong");
            }
        })
    }
    usegaProvinsiUser(idPronvinsi) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT
    tryout.murids.name,
    (SELECT
            COUNT(tryout.tryouts.id)
        FROM
            tryout.tryouts
        WHERE
            tryout.tryouts.id_murid = tryout.murids.id) as total
FROM
    tryout.murids
        INNER JOIN
    tryout.sekolahs ON tryout.sekolahs.id = tryout.murids.id_sekolah
        INNER JOIN
    tryout.areas ON tryout.areas.id = tryout.sekolahs.id_area
        INNER JOIN
    tryout.indonesia_provinces ON tryout.indonesia_provinces.id = tryout.areas.province_id where tryout.indonesia_provinces.id = ${idPronvinsi};`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => {  resolve(r) }).catch((err) => reject(err))
        })
    }
    usage() {
        return new Promise((resolve, reject) => {
            let sql = `select count(id) as total from tryout.murids;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { sentUsage(r[0].total); resolve(r[0].total) }).catch((err) => reject(err))
        })
    }
    jenjang() {
        return new Promise((resolve, reject) => {
            let sql = `select tryout.jenjangs.jenjang,(select count(tryout.tryouts.id) from tryout.tryouts where tryout.tryouts.jenjang = tryout.jenjangs.id) as total from tryout.jenjangs;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { //sentJenjang(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
    progresInput() {
        return new Promise((resolve, reject) => {
            var d = new Date();
            var day = d.getDate();
            let sql = `select jenjangs.jenjang ,matpels.nama,(select count(soals.id) from soals where soals.id_matpel = matpels.id and Day(soals.createdAt) = ${day}) as total from matpels inner join jenjangs on jenjangs.id = matpels.id_jenjang order by jenjangs.jenjang asc;`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { //sentReportProgress(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
    sendReportUser(idTryout) {
        return new Promise(async (resolve, reject) => {
            var nilai = await this.getDataNilaiTryout(idTryout);
            var head = await this.getDataTryoutForReport(idTryout);
            var total = 0;
            for (var t = 0; t < nilai.length; t++){
                total += nilai[t].nilai
            }
            sendReportUser({ ...head[0],total:(total/nilai.length), nilai: nilai });
            resolve({...head[0],total:(total/nilai.length),nilai:nilai})
        })
    }
    getDataNilaiTryout(idTryout) {
        return new Promise((resolve, reject) => {
            var d = new Date();
            var day = d.getDate();
            let sql = `select tryout.tryoutDetails.nilai,tryout.matpels.nama as matpel from tryout.tryoutDetails inner join tryout.matpels on tryout.matpels.id = tryout.tryoutDetails.id_matpel where tryout.tryoutDetails.id_tryout=${idTryout};`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { //sentReportProgress(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
    getDataTryoutForReport(idTryout) {
        return new Promise((resolve, reject) => {
            var d = new Date();
            var day = d.getDate();
            let sql = `select tryout.tryouts.id,DATE_FORMAT(tryout.tryouts.tgl,' %e %M, %Y') as tgl,tryout.jenjangs.jenjang,tryout.murids.name,tryout.murids.email,IFNULL(tryout.murids.picture,0) as foto,DATE_FORMAT(tryout.murids.tgl_lahir,' %e %M, %Y') as tgl_lahir,tryout.sekolahs.nama as sekolah from tryout.tryouts inner join tryout.murids on tryout.tryouts.id_murid = tryout.murids.id inner join tryout.jenjangs on tryout.jenjangs.id = tryout.tryouts.jenjang inner join tryout.sekolahs on tryout.sekolahs.id = tryout.murids.id_sekolah where tryout.tryouts.id = ${idTryout};`
            db.sequelize.query(sql, {
                type: db.sequelize.QueryTypes.SELECT,
            }).then((r) => { //sentReportProgress(r);
                resolve(r)
            }).catch((err) => reject(err))
        })
    }
}

module.exports = Reports;