const router = require("express").Router();
const c = require("../controllers/complaintController");
console.log("CONTROLLER:", c);

router.post("/complaint", c.createComplaint);


router.put("/assign", c.assignComplaint);


router.put("/status", c.updateStatus);


router.get("/student/complaints", c.getStudentComplaints);
router.get("/complaints", c.getComplaints);
router.get("/history", c.getHistory);


router.get("/staff", c.getAllStaff);

module.exports = router;