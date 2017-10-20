"use strict"
import validator from 'express-validator';
import validate from '../middleware/validate';
import Admin from '../models/admin';
const User = require('../models/user');

class SiteAdmin {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Admin
   */
  adminLogin(req, res) {
    validate.validateLogin(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { username, password } = req.body;
      Admin.findOne({ 'local.username': username, 'local.password': password }, (err, user) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!user) {
          return res.status(400).json({
            status: 400,
            message: 'Failed to authenticate user'
          })
        } else {
          return res.status(200).json({
            status: 200,
            message: 'successful',
            user
          });
        }
      })
    }
  }

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Admin
   */
  adminSignup(req, res) {
    validate.validateSignup(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { username, password } = req.body;
      Admin.findOne({ 'local.username': username }, (err, returnedUser) => {
        if (err) {
          res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!returnedUser) {
          var newAdmin = new Account();
          newAdmin.local.username = username;
          newAdmin.local.password = password;
          newAdmin.save((err) => {
            if (err)
              res.send(err);

            // give some success message
            res.status(201).json({
              status: 201,
              message: 'speaker successfully created!',
              newAdmin
            });
          });
        } else {
          return res.status(409).json({
            message: 'User already exits'
          });
        }
      })
    }
  }

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof SiteAdmin
   */
  getAllUsers(req, res) {
    User.find((err, user) => {
      if (err) {
        res.status(500).json({
          status: 500,
          err: err,
          message: "internal server error"
        })
      }
      console.log(user)
      res.render('admin/dashboard.ejs', {
        users: user
      });
    })
  }
}

module.exports = new SiteAdmin();