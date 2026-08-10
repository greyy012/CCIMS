const router = require("express").Router();
const admin = require("../Controllers/adminController");

router.get("/admin/dashboard", admin.getDashboard);
router.get("/admin/stats/status", admin.getStatusStats);
router.get("/admin/stats/category", admin.getCategoryStats);

router.get("/admin/staff", admin.getStaff);
router.post("/admin/staff", admin.addStaff);
router.put("/admin/staff", admin.updateStaff);
router.delete("/admin/staff", admin.deleteStaff);

router.get("/admin/categories", admin.getCategories);
router.post("/admin/categories", admin.addCategory);
router.put("/admin/categories", admin.updateCategory);
router.delete("/admin/categories", admin.deleteCategory);

router.get("/admin/students", admin.getStudents);
router.post("/admin/students", admin.addStudent);
router.delete("/admin/students", admin.deleteStudent);

router.get("/admin/announcements", admin.getAnnouncements);
router.post("/admin/announcements", admin.addAnnouncement);
router.delete("/admin/announcements", admin.deleteAnnouncement);

router.get("/admin/complaints", admin.getAllComplaints);

module.exports = router;
