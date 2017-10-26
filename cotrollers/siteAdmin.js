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
          req.flash('adminMessage', 'Failed to authenticate user');
        } else {
          req.session.username = username;
          let admin = req.session.username;
          req.flash('adminMessage', 'Welcome');
          res.redirect('/admin/dashboard')
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
          req.flash('adminMessage', 'internal server error');
          // res.status(500).json({
          //   status: 500,
          //   err: err,
          //   message: "internal server error"
          // })
        }
        if (!returnedUser) {
          var newAdmin = new Admin();
          newAdmin.local.username = username;
          newAdmin.local.password = password;
          newAdmin.save((err) => {
            if (err)
              res.send(err);

            // give some success message
            // res.status(201).json({
            //   status: 201,
            //   message: 'speaker successfully created!',
            //   newAdmin
            // });
            req.flash('adminMessage', 'user created successfully');
            res.redirect('/admin/dashboard')            
          });
        } else {
          return res.status(409).json({
            message: 'User already exits'
          });
          // res.end(error, req.flash('adminMessage', 'User already exists'))
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
    let admin = req.session.username;
    
    User.find((err, user) => {
      if (err) {
       res.send('internal server err');
      }
      res.render('admin/dashboard.ejs', { admin, user, message: req.flash('adminMessage')});
    })
  }
}

module.exports = new SiteAdmin();