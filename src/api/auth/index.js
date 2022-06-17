const route = require("express").Router();
const Auth = require('@services/Auth');

let authService = new Auth();


/**
 * @typedef AuthEntry
 * @property {string} email.required - Title - eg: Test @gmail.com
 * @property {string} password.required - Description - eg:
 */
/**
 * @route POST /auth/login
 * @group Auth
 * @param {AuthEntry.model} entry.body - eg:
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.post("/login", async (req, res) => {
  authService.Validate(req.body)
  .then(result=>{
    res.json({
      success: true,
      data_login: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data:err
    })
  })
});

module.exports = route;
