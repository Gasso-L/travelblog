const HttpException = require("../index");

class UserNotFoundException extends HttpException {
  constructor(
    message = "User not Found",
    statusCode = 404,
    error = "There are no Users to show"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = UserNotFoundException;
