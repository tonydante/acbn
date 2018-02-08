"use strict"
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';
import User from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pagination from '../utils/pagination';
import paginate from 'mongoose-paginate';


class Admins {

  /**
   * signina new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  adminSignin(req, res) {
    const { username, password } = req.body;
    Admin.findOne({
      username: username.trim().toLowerCase()
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'Failed to authenticate user'
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({
          error: 'Failed to authenticate user'
        });
      }
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
          token,
          message: `Welcome back ${user.username}`
        });
      }
    })
      .catch((error) => {
        res.status(500).send({
          error: error.message
        });
      });
  }


  /**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  adminSignup(req, res) {
    const { username, password } = req.body;
    Admin.findOne({
      username: req.body.username.trim().toLowerCase()
    })
      .then((username) => {
        if (username) {
          return res.status(409).send({
            error: 'sorry user with that username already exist'
          });
        }
        const user = new Admin({
          username: req.body.username.trim().toLowerCase(),
          password: req.body.password,

        });
        user.save().then((newUser) => {
          const token = jwt.sign(
            {
              id: newUser._id,
              username: newUser.username,
            },
            process.env.SECRET,
            { expiresIn: 24 * 60 * 60 }
          );
          return res.status(201).send({
            message: `Welcome!! ${req.body.username}`,
            user: newUser,
            token
          });
        })
          .catch((error) => {
            return res.status(400).send(error.message);
          });
      }).catch((err) => {
        return res.status(400).send({ err })
      })
  }

  /**
   * get all users
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getAllUsers(req, res) {
    User.paginate({}, { limit: Number(req.query.limit), page: Number(req.query.page) })
      .then((users) => {
        if (users) {
          res.status(200).send({
            users: users.docs,
            pages: users.pages,
            totalUsers: users.total,
            message: 'Users fetched successfully',
          });
        } else {
          res.status(404).send({
            message: 'No user found'
          });
        }
      })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  }

  /**
   * get one user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getOneUser(req, res) {
    const promise = User.findById(req.params.id).exec();
    promise.then((user) => {
      if (user) {
        res.status(201).send({
          user,
          message: 'user found'
        });
      } else {
        res.status(404).send({
          message: 'user not found'
        });
      }
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  }


  /**
  * delete an idea
  * @param {any} req user request object
  * @param {any} res servers response
  * @return {void}
  */
  deleteUser(req, res) {
    console.log(req.query.id, 'this is the id')
    if (!req.decoded.id) {
      return res.status(403).send({
        message: 'you have no permission to delete this idea'
      });
    }
    User.findById(req.query.id).exec()
      .then((user) => {
        console.log('got here')
        if (user) {
          const promise = User.remove({
            _id: req.query.id,
          }).exec();
          promise.then(() => res.status(202).send({
            message: 'User successfully deleted',
            user
          }))
            .catch((error) => {
              res.status(400).send({
                message: error.message
              });
            });

        } else {
          res.status(404).send({
            messsage: 'user does not exist'
          });
        }
      });
  }
}



module.exports = new Admins();