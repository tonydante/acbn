"use strict"
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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
          process.env.ADMINSECRET,
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
            error: 'user with that username already exist'
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
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof SiteAdmin
   */
  getAllUsers(req, res) {
    let admin = req.session.username;

    User.find((err, user) => {
      if (err) {
        res.send('internal server err');
      }
      res.render('admin/dashboard.ejs', { admin, user, message: req.flash('adminMessage') });
    })
  }
}

module.exports = new Admins();