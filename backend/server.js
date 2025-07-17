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

const allowedOrigins = [
  "http://localhost:5173",
  "https://travelblog-blush.vercel.app",
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
