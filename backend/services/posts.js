const User = require("../models/users");
const Post = require("../models/posts");
const { sanitizeContent } = require("../utility/sanitizeContent");

const findAll = async (page, pageSize) => {
  const posts = await Post.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("author", "firstName userName email avatar")
    .populate("comments", "content");

  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / pageSize);

  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts,
  };
};

const findAllByUser = async (userId, page, pageSize) => {
  const posts = await Post.find({ author: userId })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("comments", "feedback")
    .populate("author", "firstName userName")
    .sort({ createdAt: -1 });

  const totalPosts = await Post.countDocuments({ author: userId });
  const totalPages = Math.ceil(totalPosts / pageSize);

  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts,
  };
};

const findPostById = async (id) => {
  return await Post.findById(id)
    .populate("author", "_id firstName lastName userName avatar")
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "user",
        select: "firstName lastName userName avatar",
      },
    });
};

const findPostsByFilter = async ({
  location,
  tags = [],
  page = 1,
  pageSize = 10,
}) => {
  const orConditions = [];

  if (location) {
    orConditions.push({ location: { $regex: location, $options: "i" } });
  }

  if (tags.length > 0) {
    orConditions.push({
      tags: { $in: tags.map((tag) => new RegExp(tag, "i")) },
    });
  }

  const query = orConditions.length > 0 ? { $or: orConditions } : {};

  const totalPosts = await Post.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts = await Post.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate("author", "firstName lastName userName avatar")
    .sort({ createdAt: -1 });

  return { posts, totalPosts, totalPages, page, pageSize };
};

const createPost = async (post, userId) => {
  const user = await User.findOne({ _id: userId });

  const safeContent = sanitizeContent(post.content);

  const newPost = new Post({
    title: post.title,
    images: post.images,
    location: post.location,
    tags: post.tags,
    author: user,
    content: safeContent,
    comments: post.comments,
    likes: post.likes,
    ratings: post.ratings || [],
  });

  const savedPost = await newPost.save();
  await User.updateOne({ _id: user._id }, { $push: { posts: newPost } });

  return {
    message: "Post saved correctly",
    post: savedPost,
  };
};

const updatePost = async (id, post) => {
  const options = { new: true };
  return Post.findByIdAndUpdate(id, post, options);
};

const updateImages = async (id, images) => {
  const options = { new: true };
  return Post.findByIdAndUpdate(id, { images }, options);
};

const deletePost = async (id) => {
  const deletepost = await Post.findByIdAndDelete(id);
  await User.updateOne({ _id: deletepost.author }, { $pull: { posts: id } });

  return deletepost;
};

module.exports = {
  findAll,
  findPostById,
  findAllByUser,
  findPostsByFilter,
  createPost,
  updatePost,
  deletePost,
  updateImages,
};
