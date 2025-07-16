const InvalidTokenException = require("../exceptions/auth/InvalidTokenException");
const authService = require("../services/auth");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);

    res
      .header("authorization", token)
      .status(200)
      .send({
        statusCode: 200,
        message: "Login successfully",
        token,
        user: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};

const userDetail = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      throw new InvalidTokenException();
    }

    const userData = await authService.userDetail(token);

    res.status(200).send({
      statusCode: 200,
      message: "User Info",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, userDetail };
