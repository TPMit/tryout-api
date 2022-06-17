const { checkSchema } = require('express-validator'); 
const schema = { 
  POST: checkSchema({
    mulai_konsesi:{
      isLength: {
        errorMessage: 'Mulai konsesi should be at least 4 chars long',
        options: { min: 4 }
      }, 
      in: ['body']
    },
    masa_konsesi:{
      isLength: {
        errorMessage: 'masa konsesi should be at least 1 chars long',
        options: { min: 1 }
      }, 
      in: ['body']
    }, 
  })  
}; 

module.exports = schema;