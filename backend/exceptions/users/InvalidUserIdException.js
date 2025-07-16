const HttpException = require("../index");

class InvalidUserIdException extends HttpException {
  constructor(
    message = "User ID not Found",
    statusCode = 404,
    error = "The requested UserId does not exist!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidUserIdException;
