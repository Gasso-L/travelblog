const HttpException = require("../index");

class NoPostsFoundException extends HttpException {
  constructor(
    message = "Posts Not Found",
    statusCode = 404,
    error = "There are no Posts to Show"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = NoPostsFoundException;
