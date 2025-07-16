const invalidTokenException = require("../../exceptions/auth/invalidTokenException");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("authorization");

  const openRoutes = [
    { method: "POST", path: "/login" },
    { method: "POST", path: "/users" },
    { method: "GET", startsWith: "/users" },
    { method: "GET", startsWith: "/posts" },
    { method: "GET", startsWith: "/comments" },
    { method: "GET", startsWith: "/github" },
    { method: "GET", startsWith: "/google" },
    { method: "GET", startsWith: "/success" },
  ];

  const isOpenRoute = openRoutes.some((route) => {
    if (route.startsWith) {
      return (
        req.method === route.method && req.path.startsWith(route.startsWith)
      );
    }
    return req.method === route.method && req.path === route.path;
  });

  if (isOpenRoute) {
    return next();
  }

  if (!token) {
    throw new invalidTokenException();
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: verifiedToken.email });

    if (!user) throw new invalidTokenException();

    req.user = user;

    next();
  } catch (error) {
    throw new invalidTokenException();
  }
};

module.exports = verifyToken;
