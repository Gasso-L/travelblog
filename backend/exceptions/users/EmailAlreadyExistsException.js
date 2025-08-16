const HttpException = require("../index");

class EmailAlreadyExistsException extends HttpException {
  constructor(
    message = "Email already registered",
    statusCode = 409,
    error = "A user with this email already exists"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = EmailAlreadyExistsException;
