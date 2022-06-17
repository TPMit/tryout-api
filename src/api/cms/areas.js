const route = require("express").Router();
const Areas = require('@services/Areas');

let AreasService = new Areas();



/**
 * @typedef Area
 * @property {Array.<string>} areas.required
 */




/**
 * @route GET /area
 * @group AREA
 * @param {integer} id_provinsi.query - id province
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/", async (req, res) => {
    AreasService.getArea(req.query)
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
 * @route GET /area/provinsi
 * @group AREA
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/provinsi", async (req, res) => {
  AreasService.getProvinsi()
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
  });
  console.log(err)
})
});

/**
 * @route POST /area
 * @group AREA
 * @param {Area.model}  entry.body
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.post("/", async (req, res) => {
    AreasService.newArea(req.body)
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
 * Update area
 * @route PUT /area/{id}
 * @group AREA
 * @param {string} id.path.required - id
 * @param {string} area.formData.required - area
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.put("/:id", async (req, res) => {
    AreasService.UpdateArea(parseInt(req.params.id),req.body)
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
 * Delete area
 * @route DELETE /area/{id}
 * @group AREA
 * @param {string} id.path.required - id
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 * @security JWT
 */

route.delete("/:id", async (req, res) => {
    AreasService.delete(parseInt(req.params.id))
  .then(result=>{
    res.json({
      success: true,
      data_area: result,
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
 * @route GET /area/report
 * @group AREA
 * @returns {object} 200 - Success
 * @returns {object} 400 - Error
 */

route.get("/report", async (req, res) => {
    AreasService.report()
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

