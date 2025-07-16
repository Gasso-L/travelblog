const HttpException = require("../index");

class InvalidPostIdException extends HttpException {
  constructor(
    message = "Post ID not Found",
    statusCode = 404,
    error = "The requested post ID does not exists!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidPostIdException;
