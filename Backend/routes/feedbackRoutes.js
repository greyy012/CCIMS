const router = require("express").Router();
const f = require("../Controllers/feedbackController");

router.post("/feedback", f.submitFeedback);
router.get("/feedback/my", f.getMyFeedback);
router.get("/feedback", f.getAllFeedback);

module.exports = router;
