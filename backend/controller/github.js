const jwt = require("jsonwebtoken");

const authGithub = async (req, res, next) => {
  try {
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?user=${encodeURIComponent(JSON.stringify(req.user))}`;
    res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
};

const manageOauthCallback = async (req, res, next) => {
  try {
    const { user } = req;

    const payload = {
      id: user._id,
      userName: user.userName,
      firstName: user.firstName || user.userName,
      lastName: user.lastName || "",
      email: user.email || `${user.userName}@noemail.github.local`,
      avatar:
        user.avatar ||
        "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authGithub,
  manageOauthCallback,
};
