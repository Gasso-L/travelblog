const InvalidUserIdException = require("../exceptions/users/InvalidUserIdException");
const UsersNotFoundException = require("../exceptions/users/UserNotFoundException");
const usersService = require("../services/users");
const EmailService = require("../services/email");

const email = new EmailService();

const findAllUsers = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const { totalUsers, totalPages, users } = await usersService.findAllUsers(
      page,
      pageSize
    );

    if (!users || users.length === 0) {
      throw new UsersNotFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersService.findOne(id);

    if (!user) {
      throw new InvalidUserIdException();
    }

    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const savedUser = await usersService.createUser(body);

    /*     await email.send(
      body.email,
      "Registrazione Completata",
      "Ciao, grazie per esserti registrato al nostro sito!"
    ); */

    res.status(201).send({
      statusCode: 201,
      message: "User Created",
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        userName: savedUser.userName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const editUser = await usersService.updateUser(id, body);

    if (!editUser) {
      throw new InvalidUserIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "User edited successfully",
      editUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersService.deleteUser(id);

    if (!user) {
      throw new InvalidUserIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "User deleted",
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avatarUrl = req.file.path;

    const newUserAvatar = await usersService.updateUserAvatar(id, avatarUrl);

    if (!newUserAvatar) {
      throw new InvalidUserIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Avatar Edited Correctly",
      newUserAvatar: {
        id: newUserAvatar._id,
        avatar: newUserAvatar.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar,
};
