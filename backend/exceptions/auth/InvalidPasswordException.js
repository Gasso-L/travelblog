const HttpException = require("../index");

class InvalidPasswordException extends HttpException {
  constructor(
    message = "Invalid email or password",
    statusCode = 403,
    error = "Email or password is not valid"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidPasswordException;
