const router = require("express").Router();
const c = require("../controllers/complaintController");

router.post("/complaint", c.createComplaint);
router.put("/assign", c.assignComplaint);
router.put("/status", c.updateStatus);

router.get("/student/complaints", c.getStudentComplaints);
router.get("/complaints", c.getComplaints);
router.get("/history", c.getHistory);


module.exports = router;