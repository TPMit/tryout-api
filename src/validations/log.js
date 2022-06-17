const { checkSchema } = require('express-validator'); 

const schema = { 
  GET: checkSchema({
    perusahaan_id: {
      in: ['params', 'query'],
      exists: {
        errorMessage: 'perusahaan_id is required', 
      },
      notEmpty : {
          errorMessage: 'perusahaan_id cannot empty', 
      },
      isNumeric: {
        errorMessage: 'perusahaan_id must be numeric',
      },
    },
    offset : {
        in : ['params','query'],
        exists:{
            errorMessage:'offset is required'
        },
        notEmpty : {
            errorMessage : 'offset cannot empty'
        },
        isNumeric : {
            errorMessage : 'offset must be integer'
        },
        isInt: true,
        // Sanitizers can go here as well
        toInt: true
    },
    limit : {
        in : ['params','query'],
        exists : {
            errorMessage : "limit is required"
        },
        notEmpty : {
            errorMessage : 'limit cannot empty'
        },
        isNumeric : {
            errorMessage : 'limit must be integer'
        },
        isInt: true,
        // Sanitizers can go here as well
        toInt: true
    }

  }),
  POST : checkSchema({
    perusahaan_id: {
      in: ['body'],
      exists: {
        errorMessage: 'perusahaan_id is required', 
      },
      notEmpty : {
          errorMessage: 'perusahaan_id cannot empty', 
      },
      isNumeric: {
        errorMessage: 'perusahaan_id must be numeric',
      },
      isInt: true,
      toInt: true
    },
    user_id: {
      in: ['body'],
      exists: {
        errorMessage: 'user_id is required', 
      },
      notEmpty : {
          errorMessage: 'user_id cannot empty', 
      },
      isNumeric: {
        errorMessage: 'user_id must be numeric',
      },
      isInt: true,
      toInt: true
    },
    activity: {
      in: ['body'],
      exists: {
        errorMessage: 'activity is required', 
      },
      notEmpty : {
          errorMessage: 'activity cannot empty', 
      },
    },
  })
  // define all the other schemas below 
}; 

module.exports = schema;