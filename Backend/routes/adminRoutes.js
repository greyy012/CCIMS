const router = require("express").Router();
const admin = require("../controllers/adminController");

router.get("/admin/dashboard", admin.getDashboard);

module.exports = router;