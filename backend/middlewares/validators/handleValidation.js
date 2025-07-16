const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = handleValidation;
