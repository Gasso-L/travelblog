const NoPostFoundException = require("../exceptions/posts/NoPostsFoundException");
const InvalidPostIdException = require("../exceptions/posts/InvalidPostIdException");
const postService = require("../services/posts");

const findAllPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const { posts, totalPages, totalPosts } = await postService.findAll(
      page,
      pageSize
    );

    if (!posts || posts.length === 0) {
      throw new NoPostFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      page,
      pageSize,
      totalPages,
      totalPosts,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const findAllByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const posts = await postService.findAllByUser(id);

    if (!posts) {
      throw new InvalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const findPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postService.findPostById(id);

    if (!post) {
      throw new InvalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const findByLocationOrTag = async (req, res, next) => {
  try {
    const { location, tag, page = 1, pageSize = 10 } = req.query;

    const tags = tag ? (Array.isArray(tag) ? tag : [tag]) : [];

    if (!location && tags.length === 0) {
      return res.status(400).send({
        statusCode: 400,
        message:
          "Please specify at least a location or a tag to perform a search.",
      });
    }

    const result = await postService.findPostsByFilter({
      location,
      tags,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    res.status(200).send({
      statusCode: 200,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { body, user } = req;
    const result = await postService.createPost(body, user.id);

    res.status(201).send({
      statusCode: 201,
      message: result.message,
      post: result.post,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await postService.updatePost(id, req.body);

    if (!updated) {
      throw new InvalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      post: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await postService.deletePost(id);

    if (!deleted) {
      throw new InvalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post deleted",
      post: deleted,
    });
  } catch (error) {
    next(error);
  }
};

const updateImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    const imageUrls = req.files.map((file) => file.path);

    const updated = await postService.updateImages(id, imageUrls);

    if (!updated) {
      throw new InvalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Images updated",
      post: updated,
    });
  } catch (error) {
    next(error);
  }
};

const ratePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const userId = req.user.id;

    const post = await postService.findById(id);
    if (!post) throw new InvalidPostIdException();

    const existingRating = post.ratings.find(
      (r) => r.user.toString() === userId
    );

    if (existingRating) {
      existingRating.value = value;
    } else {
      post.ratings.push({ user: userId, value });
    }

    await post.save();

    res.status(200).send({
      statusCode: 200,
      message: "Rating updated successfully",
      ratings: post.ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllPosts,
  findAllByUser,
  findPostById,
  findByLocationOrTag,
  createPost,
  updatePost,
  deletePost,
  updateImages,
  ratePost,
};
