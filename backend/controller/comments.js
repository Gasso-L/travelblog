const InvalidCommentIdException = require("../exceptions/comments/InvalidCommentIdException");
const NoCommentsFoundException = require("../exceptions/comments/NoCommentsFoundException");
const commentService = require("../services/comments");
const postService = require("../services/posts");

const findAllComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const result = await commentService.findAll(page, pageSize, postId);

    const post = await postService.findPostById(postId);
    const postRatings = post?.ratings || [];

    res.status(200).send({
      statusCode: 200,
      ...result,
      postRatings,
    });
  } catch (error) {
    next(error);
  }
};

const findOneComment = async (req, res, next) => {
  try {
    const { commentId, postId } = req.params;

    const comment = await commentService.findSingleComment(commentId, postId);

    if (!comment) {
      throw new InvalidCommentIdException();
    }

    res.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const findAllByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const result = await commentService.findAllByUser(userId, page, pageSize);

    if (!result.comments || result.comments.length === 0) {
      throw new NoCommentsFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user.id;

    const newComment = await commentService.createComment(
      { content, user: userId },
      postId
    );

    const post = await postService.findPostById(postId);

    if (rating && rating >= 1 && rating <= 5) {
      const alreadyRated = post.ratings.find(
        (r) => r.user.toString() === userId
      );

      if (!alreadyRated) {
        post.ratings.push({ user: userId, value: rating });
        await post.save();
      }
    }

    res.status(201).send({
      statusCode: 201,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updated = await commentService.updateSingleComment(commentId, {
      feedback: content,
    });

    if (!updated) {
      throw new InvalidCommentIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      comment: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const deleted = await commentService.deleteComment(commentId);

    res.status(200).send({
      statusCode: 200,
      message: "Comment deleted",
      comment: deleted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllComments,
  findOneComment,
  findAllByUser,
  createComment,
  updateComment,
  deleteComment,
};
