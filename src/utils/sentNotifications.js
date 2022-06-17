// @ts-nocheck
'Order strict';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const emailTo = "pt.tunasperkasamudalogistik@gmail.com";
const transport = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'tryouttpm@gmail.com',
                            pass: 'tryout123'
                        }
                        })
                    );


var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

sentReportProgress = function(){
  var htmlToSend = "<p>Berikut Kami Kirimkan Report Harian dari tesujian.com</p>";
    var message = {
        from: 'tryouttpm@gmail.com',
        to: 'prasojo.utomo@mindotek.com',
        // to: 'tedijammz@gmail.com',
        bcc: emailTo,
        subject : 'Progress Input Soal per Hari',
        html: htmlToSend,
        attachments: [
        {
            filename: 'Laporan_Perhari.xlsx',
            path: './Laporan_Perhari.xlsx'
        }
    ]
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
}

sentReportPembayaran = function(data){
  readHTMLFile(path.resolve('./public/mailtemplate/pembayaran.html'), function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        data: data,
    };
  var htmlToSend = "<p>Berikut Kami Kirimkan Report Harian dari tesujian.com</p>";
    var message = {
        from: 'tryouttpm@gmail.com',
        to: 'prasojo.utomo@mindotek.com',
        bcc: emailTo,
        subject : 'Report Harian',
        html : htmlToSend
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
  });
}
sentReportProvinsi = function (data) {
  readHTMLFile(path.resolve('./public/mailtemplate/provinsi.html'), function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        data: data,
    };
    var htmlToSend = template(replacements);
    var message = {
        from: 'tryouttpm@gmail.com',
        to: 'prasojo.utomo@mindotek.com',
        bcc: emailTo,
        subject : 'Report User per Provinsi',
        html : htmlToSend
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
  });
}
sentUsage = function (data) {
  readHTMLFile(path.resolve('./public/mailtemplate/usage.html'), function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        data: data,
    };
    var htmlToSend = template(replacements);
    var message = {
        from: 'tryouttpm@gmail.com',
        to: 'prasojo.utomo@mindotek.com',
        bcc: emailTo,
        subject : 'Report Usage',
        html : htmlToSend
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
  });
}

sendReportUser = function (data) {
  readHTMLFile(path.resolve('./public/mailtemplate/userreport.html'), function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        data: data,
    };
    var htmlToSend = template(replacements);
    var message = {
        from: 'tryouttpm@gmail.com',
        to: 'pt.tunasperkasamudalogistik@gmail.com',
        bcc: emailTo,
        subject : 'Report Tryout per Jenjang',
        html: htmlToSend
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
  });
}

module.exports = {
  sentReportProgress,
  sentReportPembayaran,
  sentReportProvinsi,
  sentUsage,
  sendReportUser
}
