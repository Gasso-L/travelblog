const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      max: 100,
      min: 2,
      required: true,
    },

    lastName: {
      type: String,
      max: 100,
      min: 2,
      required: true,
    },

    userName: {
      type: String,
      max: 100,
      min: 2,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    dob: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dkfcilr87/image/upload/v1752317559/avatar9_ul9bmv.png",
    },
    password: {
      type: String,
      required: true,
      min: 12,
      select: false,
    },
    bio: {
      type: String,
      max: 255,
      min: 10,
      required: false,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  },
  { timestamps: true, strict: true }
);

UsersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

UsersSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified()) {
    return next;
  }

  if (!user.userName) {
    const baseUserName = `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    user.userName = `${baseUserName}${randomSuffix}`;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (error) {
    next(e);
  }
});

module.exports = mongoose.model("user", UsersSchema, "users");
