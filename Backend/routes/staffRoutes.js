const router = require("express").Router();
const s = require("../controllers/staffController");

router.get("/staff/complaints", s.getMyComplaints);
router.get("/staff", s.getAllStaff);

module.exports = router;