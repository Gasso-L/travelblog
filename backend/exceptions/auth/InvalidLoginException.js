const HttpException = require("../index");

class InvalidLoginException extends HttpException {
  constructor(
    message = "Invalid Login",
    statusCode = 403,
    error = "No user found with these credentials"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidLoginException;
