const { body } = require("express-validator");

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 2, max: 5000 })
    .withMessage("Content must be between 2 and 5000 characters"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),

  body("tags.*").optional().isString().withMessage("Each tag must be a string"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of URLs"),

  body("images.*")
    .optional()
    .isURL()
    .withMessage("Each image must be a valid URL"),
];

const validatePostPatch = [
  body("title")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("content")
    .optional()
    .isLength({ min: 2, max: 5000 })
    .withMessage("Content must be between 2 and 5000 characters"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),

  body("tags.*").optional().isString().withMessage("Each tag must be a string"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of URLs"),

  body("images.*")
    .optional()
    .isURL()
    .withMessage("Each image must be a valid URL"),
];

module.exports = {
  validatePost,
  validatePostPatch,
};
