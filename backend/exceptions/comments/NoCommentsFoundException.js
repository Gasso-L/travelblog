const HttpException = require("../index");

class NoCommentsFoundException extends HttpException {
  constructor(
    message = "Comments not Found",
    statusCode = 404,
    error = "There are no comments to show"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = NoCommentsFoundException;
