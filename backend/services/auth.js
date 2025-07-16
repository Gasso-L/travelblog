const invalidPasswordException = require("../exceptions/auth/InvalidPasswordException");
const invalidTokenException = require("../exceptions/auth/InvalidTokenException");
const invalidLogin = require("../exceptions/auth/InvalidLoginException");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new invalidLogin();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new invalidPasswordException();
  }

  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
    },
  };
};

const userDetail = async (token) => {
  if (!token) {
    throw new invalidTokenException();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new invalidTokenException();
    }

    return {
      user,
    };
  } catch (error) {
    throw new invalidTokenException();
  }
};

module.exports = { login, userDetail };
