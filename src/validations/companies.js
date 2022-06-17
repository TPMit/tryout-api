const { checkSchema } = require('express-validator'); 
const isFieldUnique = require('@helpers/isFieldUnique');

const schema = { 
  POST: checkSchema({ 
    /*'company_shares.*.profit_center_id': {
      custom: {
        options: (value, { req, location, path }) => {
          if(req.method=='PUT') { return location }
          return isFieldUnique('company_shares', 'profit_center_id', value, 'Profit_center_id already registered');
        }
      },
      in: ['body']
    },*/
    'users.*.email': {
      custom: {
        options: (value, { req, location, path }) => {
          if(req.method=='PUT') { return location }  
          return isFieldUnique('users', 'email', value, 'Email already registered');
        }
      },
      in: ['body']
    }
  })  
}; 

module.exports = schema;