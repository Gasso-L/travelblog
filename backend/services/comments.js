const NoCommentsFoundException = require("../exceptions/comments/NoCommentsFoundException");
const NoPostsFoundException = require("../exceptions/posts/NoPostsFoundException");
const Comment = require("../models/comments");
const Post = require("../models/posts");

const findAll = async (page, pageSize, postID) => {
  const comments = await Comment.find({ post: postID })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("user", "firstName userName avatar");

  const totalComments = await Comment.countDocuments({ post: postID });
  const totalPages = Math.ceil(totalComments / pageSize);

  return {
    page,
    pageSize,
    totalComments,
    totalPages,
    comments,
  };
};

const findSingleComment = async (commentID, postID) => {
  return await Comment.findOne({
    _id: commentID,
    post: postID,
  }).populate("post", "title location tags author likes");
};

const findAllByUser = async (userId, page, pageSize) => {
  const comments = await Comment.find({ author: userId })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("post", "title")
    .sort({ createdAt: -1 });

  const totalComments = await Comment.countDocuments({ author: userId });
  const totalPages = Math.ceil(totalComments / pageSize);

  return {
    page,
    pageSize,
    totalComments,
    totalPages,
    comments,
  };
};

const createComment = async (comments, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new NoPostsFoundException();
  }

  const newComment = new Comment({
    content: comments.content,
    user: comments.user,
    post: postId,
  });

  const saveComment = await newComment.save();
  await saveComment.populate("user", "firstName lastName userName avatar");

  await Post.updateOne({ _id: post._id }, { $push: { comments: newComment } });

  return saveComment;
};

const updateSingleComment = async (commentID, feedback) => {
  const options = { new: true };

  return Comment.findByIdAndUpdate(commentID, feedback, options);
};

const deleteComment = async (commentID) => {
  const deleteComment = await Comment.findByIdAndDelete(commentID);

  if (!deleteComment) {
    throw new NoCommentsFoundException();
  }
  await Post.updateOne(
    { _id: deleteComment.post },
    { $pull: { comments: commentID } }
  );

  return deleteComment;
};

module.exports = {
  findAll,
  createComment,
  findSingleComment,
  findAllByUser,
  updateSingleComment,
  deleteComment,
};
