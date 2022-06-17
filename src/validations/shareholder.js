const { checkSchema } = require('express-validator');

const schema = {
  GET: checkSchema({
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
    'equity_detail.*.equity_item': {
      in: ['body'],
      exists: {
        errorMessage: 'equity_item is required',
      },
      notEmpty : {
          errorMessage: 'equity_item cannot empty',
      },
    },
    'equity_detail.*.equity_value': {
      in: ['body'],
      exists: {
        errorMessage: 'equity_value is required',
      },
      notEmpty : {
          errorMessage: 'equity_value cannot empty',
      },
    },
  })
  // define all the other schemas below
};

module.exports = schema;