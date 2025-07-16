const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 1000,
      min: 5,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("comment", CommentSchema, "comments");
