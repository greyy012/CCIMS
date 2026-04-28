const router = require("express").Router();
const c = require("../controllers/complaintController");
console.log("CONTROLLER:", c);
// ✅ CREATE
router.post("/complaint", c.createComplaint);

// ✅ ASSIGN (FIXED NAME)
router.put("/assign", c.assignComplaint);

// ✅ STATUS
router.put("/status", c.updateStatus);

// ✅ GETS
router.get("/student/complaints", c.getStudentComplaints);
router.get("/complaints", c.getComplaints);
router.get("/history", c.getHistory);

// ✅ STAFF LIST
router.get("/staff", c.getAllStaff);

module.exports = router;