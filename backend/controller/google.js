const jwt = require("jsonwebtoken");

const authGoogle = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user._id,
      userName: user.userName,
      firstName: user.firstName || user.userName,
      lastName: user.lastName || "",
      email: user.email || `${user.userName}@noemail.gmail.local`,
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
    console.error("ERRORE NEL CONTROLLER OAUTH:", e);
    next(e);
  }
};

module.exports = {
  authGoogle,
};
