const router = require("express").Router();
const msg = require("../controllers/messageController");

router.get("/messages", msg.getMessages);

module.exports = router;