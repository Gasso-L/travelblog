const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
      min: 2,
    },
    images: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 5000,
      min: 2,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
      default: [],
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    ratings: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          value: { type: Number, min: 1, max: 5, required: false },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("post", PostSchema, "posts");
