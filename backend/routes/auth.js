const express = require("express");
const authRoute = express.Router();
const authController = require("../controller/auth");

authRoute.post("/login", authController.login);
authRoute.get("/me", authController.userDetail);

module.exports = authRoute;
