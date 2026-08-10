const router = require("express").Router();
const c = require("../Controllers/complaintController");
console.log("CONTROLLER:", c);

router.post("/complaint", c.createComplaint);


router.put("/assign", c.assignComplaint);


router.put("/status", c.updateStatus);
router.put("/withdraw", c.withdrawComplaint);
router.delete("/complaint", c.deleteComplaint);

router.get("/student/complaints", c.getStudentComplaints);
router.get("/complaints/stats", c.getComplaintStats);
router.get("/complaints/stats/category", c.getCategoryStats);
router.get("/student/dashboard", c.getStudentDashboard);
router.get("/complaints", c.getComplaints);
router.get("/history", c.getHistory);


router.get("/staff", c.getAllStaff);

module.exports = router;