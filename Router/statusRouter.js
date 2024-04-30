const { Router } = require("express");
const { postStatus, getStatus } = require("../Controller/statusController");

const router = Router();
const userMiddleware = require("../middleware/authMiddleware");

router.get("/get", userMiddleware, getStatus);
router.post("/post", userMiddleware, postStatus);

module.exports = router;
