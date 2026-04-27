const router = require("express").Router();
const cat = require("../controllers/categoryController");

router.get("/categories", cat.getCategories);

module.exports = router;