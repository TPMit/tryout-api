const route = require("express").Router();
const soalTypes = require('@services/Soaltype');

let soalTypesService = new soalTypes();



/**
 * @typedef soaltype
 * @property {Array.<string>} type.required
 */

/**
 * @route GET /soaltype
 * @group Soal Type
 * @param {integer} id_type.query - id type
 * @param {integer} id_matpel.query - id matpel
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    soalTypesService.getSoalTypes(req.query)
  .then(result=>{
    res.json({
      success: true,
      data_soal_type: result,
    });
  })
  .catch((err)=>{
    console.log(err);
    res.json({
      success:false,
      data:err
    })
  })
});


/**
 * @route POST /soaltype
 * @group Soal Type
 * @param {string} type.formData.required - type
 * @param {integer} id_matpel.formData.required - id matpel
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
  soalTypesService.newSoalType(req.body)
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
* Update soaltype
* @route PUT /soaltype/{id}
* @group Soal Type
* @param {string} id.path.required - id
* @param {string} type.formData.required - type
* @param {integer} id_matpel.formData.required - id matpel
* @returns {object} 200 - Success
* @returns {object} 400 - Error
* @security JWT
*/

route.put("/:id", async (req, res) => {
  soalTypesService.UpdateSoalType(parseInt(req.params.id),req.body)
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
* Delete soaltype
* @route DELETE /soaltype/{id}
* @group Soal Type
* @param {string} id.path.required - id
* @returns {object} 200 - Success
* @returns {object} 400 - Error
* @security JWT
*/

route.delete("/:id", async (req, res) => {
  soalTypesService.delete(parseInt(req.params.id))
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
