const HttpException = require("../index");

class InvalidTokenException extends HttpException {
  constructor(
    message = "Invalid or missing token",
    statusCode = 401,
    error = "Token is not valid or is missing"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidTokenException;
