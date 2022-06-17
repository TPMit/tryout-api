const express = require('express'); 
const logger  = require('morgan');
const helmet  = require('helmet');
const cors    = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const path = require('path'); 
//const multiparty = require('multiparty');

// global variable
require('module-alias/register');
global.__base = __dirname + '/';

var app = express();

const ApiRoutes = require('./api');
const AuthRoutes = require('./api/auth'); 

// load middleware
app.use(logger('dev'));
app.options('*', cors()) // include before other routes
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Authenticate', 'username', 'password');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
var whitelist = ['*'];
const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1) {
      console.log('origin->' + origin)
      callback(null, true)
    } else {
      console.log('origin->' + origin)
      callback(null, true)
      //callback(new Error('not allow not defined origin: '+origin),false)
    }
  },

  allowedHeaders: 'Content-Type,Authorization,Access-Control-Allow-Origin,Authenticate,username,password',
  preflightContinue: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit: 1000000}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, './public')));
app.use(helmet());

const expressSwagger = require('express-swagger-generator')(app);

app.use('/api', ApiRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/cms/', ApiRoutes)

dotenv.config();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const ip = process.env.IP;

let option_cms = {
  swaggerDefinition: {
    info: {
        description: 'CMS API',
        title: 'Swagger',
        version: '2.0.0',
    },
        host:  'api.tesujian.com',
        basePath: '/v1/',
        produces: [
        "application/json",
        "application/xml"
    ],
    schemes: ['https','http'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "",
        }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./api/cms/*.js', './api/auth/*.js'], //Path to the API handle folder
  route: {
      url: '/cms-docs',
      docs: '/cms-docs.json'
  }
};
expressSwagger(option_cms)

app.listen(port, hostname, () =>
  console.log(`Your port is ${hostname} ${process.env.PORT}`),
); 

module.exports = app;
