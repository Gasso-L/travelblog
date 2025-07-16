const HttpException = require("../exceptions/index");
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      statusCode: 400,
      message: "Mongoose Error: Object ID Invalid o Malformed",
      error: err.error,
    });
  }

  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    error: "An Error Has Occured, Please try later",
  });
};

module.exports = errorHandler;
