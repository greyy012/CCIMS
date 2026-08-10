const router = require("express").Router();
const cat = require("../Controllers/categorycontroller");

router.get("/categories", cat.getCategories); 

module.exports = router;