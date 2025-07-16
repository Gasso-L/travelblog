const { body } = require("express-validator");

const validateComment = [
  body("content")
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Comment must be between 5 and 1000 characters"),
];

module.exports = validateComment;
