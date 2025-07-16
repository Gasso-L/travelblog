const express = require("express");
const router = express.Router();
const handleValidation = require("../middlewares/validators/handleValidation");
const validateComment = require("../middlewares/validators/commentValidator");
const commentController = require("../controller/comments");

router.post(
  "/comments/:postId",
  validateComment,
  handleValidation,
  commentController.createComment
);

router.get("/comments/:postId", commentController.findAllComments);

router.get("/comments/:postId/:commentId", commentController.findOneComment);

router.get("/comments/user/me", commentController.findAllByUser);

router.patch(
  "/comments/:commentId",
  validateComment,
  handleValidation,
  commentController.updateComment
);

router.delete("/comments/:commentId", commentController.deleteComment);

module.exports = router;
