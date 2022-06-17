const route = require("express").Router();
const Choicesoal = require('@services/Choicesoal');

let ChoicesoalService = new Choicesoal();



/**
 * @typedef Choice
 * @property {Array.<string>} choice.required
 * @property {integer} id_soal.required
 */

/**
 * GET Choice
 * @route GET /choicesoal
 * @group Choice
 * @param {integer} id.query
 * @param {integer} id_soal.query - Description - eg: id_soal
 * @param {integer} offset.query.required - Description - eg: 0
 * @param {integer} limit.query.required - Description - eg: 10
 * @returns {object} 200 - An array of log
 * @returns {object} 400 - Error
 * @security JWT
 */

route.get("/", async (req, res) => {
    ChoicesoalService.getChoicesoal(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_choice: result,
    });
  })
  .catch((err)=>{
      console.log(err)
    res.json({
      success:false,
      data:err
    })
  })
});



/**
 * @route POST /choicesoal
 * @group Choice
 * @param {Choice.model}  entry.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    ChoicesoalService.newChoicesoal(req.body)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data:err
    })
  })
});

/**
 * Update choicesoal
 * @route PUT /choicesoal/{id}
 * @group Choice
 * @param {string} id.path.required - id
 * @param {string} choice.formData.required - Choice Soal
 * @param {string} id_soal.formData.required - Id Soal
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    ChoicesoalService.UpdateChoiceSoal(parseInt(req.params.id),req.body)
  .then(result=>{
    res.json({
      success: true,
      data: result,
    });
  })
  .catch((err)=>{
    res.json({
      success:false,
      data:err
    })
  })
});


/**
 * Delete choicesoal
 * @route DELETE /choicesoal/{id}
 * @group Choice
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    ChoicesoalService.delete(parseInt(req.params.id))
  .then(result=>{
    res.json({
      success: true,
      data: result,
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
