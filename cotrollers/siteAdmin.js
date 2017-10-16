"use strict"
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
    const { username, password } = req.body;
    Admin.findOne({ 'local.username': username, 'local.password': password }, (err, user) => {
      if (err) {
        res.status(500).json({
          status: 500,
          err: err,
          message: "internal server error"
        })
      }
      if (!user) {
        res.status(400).json({
          status: 400,
          message: 'Failed to authenticate user'
        })
      } else {
        return res.status(200).json({
          status: 200,
          user
        });
      }
    })
  }

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Admin
   */
  adminSignup(req, res) {
    // validate.validateSignup(req, res);
		// var errors = req.validationErrors();
		// if (errors) {
		// 	res.send(errors);
		// 	return;
		// } else {
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
        var newAdmin = new Admin();
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
//}

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

  transfer(amount) {
    Accounts.findOne({ where: { accountNumber: accountNumber } }, (account) => {
      if (account) {
        if (amount > account.balance) {
          res.status(400).json({
            status: 400, message: "Insufficient fund"
          });
        }
        Account.update({ accountNumber: accountNumber }, { $set: { balance: balance -= amount } }, (result) => {
          if (result) {
            res.status(200).json({
              status: 200, message: "Account Updated"
            });
          }
        })
      }
    })
  }
}
module.exports = new SiteAdmin();