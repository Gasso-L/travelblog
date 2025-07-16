const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/auth/verifyToken");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
const oauthRoute = require("./routes/oauth");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 9099;
const startServer = require("../backend/config/db");

const server = express();
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(express.json());

server.use(verifyToken);

server.use("/", authRoutes);
server.use("/", userRoutes);
server.use("/", postRoutes);
server.use("/", commentRoutes);
server.use("/", oauthRoute);

server.use(errorHandler);

startServer(PORT, server);
