const { Router } = require("express");
const {
  postStatus,
  getStatus,
  postLike,
  postComment,
} = require("../Controller/statusController");

const router = Router();
const userMiddleware = require("../middleware/authMiddleware");

router.get("/get", userMiddleware, getStatus);
router.post("/post", userMiddleware, postStatus);
router.post("/like/:id/:value", userMiddleware, postLike);
router.post("/comment/:id", userMiddleware, postComment);

module.exports = router;
