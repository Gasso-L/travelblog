const express = require("express");
const router = express.Router();
const postController = require("../controller/posts");

const { cloudPostUpload } = require("../middlewares/multer/index");

const {
  validatePost,
  validatePostPatch,
} = require("../middlewares/validators/postValidator");

const handleValidation = require("../middlewares/validators/handleValidation");

router.post(
  "/posts",
  validatePost,
  handleValidation,
  postController.createPost
);

router.get("/posts", postController.findAllPosts);

router.get("/posts/search", postController.findByLocationOrTag);

router.get("/posts/:id", postController.findPostById);

router.get("/posts/user/:id", postController.findAllByUser);

router.patch("/posts/:id/rating", postController.ratePost);

router.patch(
  "/posts/:id",
  validatePostPatch,
  handleValidation,
  postController.updatePost
);

router.patch(
  "/posts/:id/images",
  cloudPostUpload.array("images", 10),
  postController.updateImages
);

router.delete("/posts/:id", postController.deletePost);

module.exports = router;
