const User = require("../models/users");
const Post = require("../models/posts");
const bcrypt = require("bcrypt");

const findAllUsers = async (page, pageSize) => {
  const users = await User.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("posts", ["_id", "title", "author"]);

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    page,
    pageSize,
    totalUsers,
    totalPages,
    users,
  };
};

const createUser = async (user) => {
  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    dob: user.dob,
    avatar: user.avatar,
    password: user.password,
    bio: user.bio,
    authProvider: user.authProvider || "local",
  });

  const savedUser = await newUser.save();

  return savedUser;
};

const updateUser = async (id, user) => {
  const options = { new: true };
  if (typeof user.password === "string" && user.password.trim().length > 0) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  return User.findByIdAndUpdate(id, user, options);
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const updateUserAvatar = async (id, avatar) => {
  const options = { new: true };
  return User.findByIdAndUpdate(id, { avatar }, options);
};

const findById = async (id) => {
  return User.findById(id);
};

const findOne = async (filter) => {
  return User.findOne(filter);
};

module.exports = {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar,
  findById,
  findOne,
};
