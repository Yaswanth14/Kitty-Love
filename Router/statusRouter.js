const { Router } = require("express");
const {
  postStatus,
  getStatus,
  postLike,
  postReply,
  getReplies,
  postLikeReply,
} = require("../Controller/statusController");

const router = Router();
const userMiddleware = require("../middleware/authMiddleware");

router.get("/get", userMiddleware, getStatus);
router.post("/post", userMiddleware, postStatus);
router.post("/like/:id/:value", userMiddleware, postLike);
router.post("/reply/:id", userMiddleware, postReply);
router.get("/replies/:id", userMiddleware, getReplies);
router.post("/reply/like/:id/:value", userMiddleware, postLikeReply);

module.exports = router;
