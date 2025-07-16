const HttpException = require("../index");

class InvalidCommentIdException extends HttpException {
  constructor(
    message = "Comment ID not Found",
    statusCode = 404,
    error = "The requested comment ID does not exist!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidCommentIdException;
