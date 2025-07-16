const { body } = require("express-validator");

const validateUser = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters"),

  body("userName")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Username must be between 2 and 100 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^\S+@\S+\.\S+$/)
    .withMessage("Invalid email format"),

  body("dob")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date of birth must be a valid date"),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters"),

  body("bio")
    .optional()
    .isLength({ min: 10, max: 255 })
    .withMessage("Bio must be between 10 and 255 characters"),
];

const validateUserPatch = [
  body("firstName")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),

  body("lastName")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters"),

  body("userName")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Username must be between 2 and 100 characters"),

  body("email")
    .optional()
    .matches(/^\S+@\S+\.\S+$/)
    .withMessage("Invalid email format"),

  body("dob")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date of birth must be a valid date"),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

  body("password")
    .optional()
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters"),

  body("bio")
    .optional()
    .isLength({ min: 10, max: 255 })
    .withMessage("Bio must be between 10 and 255 characters"),
];

module.exports = { validateUser, validateUserPatch };
