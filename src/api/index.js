// @ts-nocheck
const route = require("express").Router();
/*
 * authAcl ( authentication with access control routes )
 * authPassport ( only authentication )
 */
const { authAcl, authPassport } = require("../middlewares/acl");

// let array = {
// };

// for (let item in array) {
//   route.use("/" + array[item], authPassport, require("./" + item));
// }

route.use("/auth", require("./auth/index"));
route.use("/area", require("./cms/areas"));
route.use("/sekolah", require("./cms/sekolahs"));
route.use("/matpel", require("./cms/matpels"));
route.use("/murid", require("./cms/murids"));
route.use("/soaltype", require("./cms/soaltypes"));
route.use("/bayar", require("./cms/bayars"));
route.use("/choicesoal", require("./cms/choicesoals"));
route.use("/soals", require("./cms/soals"));
route.use("/daftar", require("./cms/daftars"));
route.use("/guru", require("./cms/gurus"));
route.use("/tryout", require("./cms/tryouts"));
route.use("/tryoutdetails", require("./cms/tryoutDetails"));
route.use("/finishdetailpondoks", require("./cms/finishDetailPondoks"));
route.use("/tryoutdetailpondoks", require("./cms/tryoutDetailPondoks"));
route.use("/finishTryoutPondok", require("./cms/tryoutDetailPondoks"));
route.use("/tryoutdetailsoal", require("./cms/tryoutDetailSoals"));
route.use("/jenjang", require("./cms/jenjangs"));
route.use("/paket", require("./cms/pakets"));
route.use("/upload", require("./cms/uploadFile"));
route.use("/finishTryoutDetail", require("./cms/tryoutDetails"));
route.use("/HistoryTryout", require("./cms/historyTryouts"));
route.use("/RasioGrades", require("./cms/rasios"));
route.use("/jurusan", require("./cms/jurusans"));
route.use("/CheckStatus", require("./cms/checkStatus"));
route.use("/UpdateJawabans", require("./cms/updateJawabans"));
route.use("/cronjob",require("./cms/cronjon"));
route.use("/notif",require("./cms/notif"));
route.use("/finishTryout",require("./cms/tryouts"));
route.use("/koreksiTryout",require("./cms/koreksi"));
route.use("/report",require("./cms/report"));
route.use("/psikotes", require("./cms/psikotes"));
route.use("/bacaQuran", require("./cms/bacaQuran"));
route.use("/hukumTajwids", require("./cms/hukumTajwids"));
route.use("/hafalanJuz", require("./cms/hafalanJuz"));
route.use("/praktekIbadah", require("./cms/praktekIbadah"));
route.use("/imla", require("./cms/imla"));
route.use("/bahasaIndonesia", require("./cms/bahasaIndonesia"));
route.use("/berhitungAngka", require("./cms/berhitungAngka"));
route.use("/berhitungSoal", require("./cms/berhitungSoal"));
module.exports = route;
