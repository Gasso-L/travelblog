const { cloudUserAvatarUpload } = require("../middlewares/multer/index");
const express = require("express");
const router = express.Router();

const userController = require("../controller/users");

const {
  validateUser,
  validateUserPatch,
} = require("../middlewares/validators/userValidator");

const handleValidation = require("../middlewares/validators/handleValidation");

router.post(
  "/users",
  validateUser,
  handleValidation,
  userController.createUser
);

router.get("/users", userController.findAllUsers);

router.get("/users/:id", userController.findUserById);

router.patch(
  "/users/:id",
  validateUserPatch,
  handleValidation,
  userController.updateUser
);

router.patch(
  "/users/:id/avatar",
  cloudUserAvatarUpload.single("avatar"),
  userController.updateUserAvatar
);

router.delete("/users/:id", userController.deleteUser);

module.exports = router;
