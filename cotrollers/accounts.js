"use strict"
import validator from 'express-validator';
import validate from '../middleware/validate';
import Accounts from '../models/account';
import User from '../models/user';
import Transactions from '../models/transaction';


class Account {

  /**
   * 
   * 
   * @param {any} userId 
   * @param {any} accountNumber
   * @param {any} accountType
   * @param {any} balance 
   * @memberof Account
   */
  createAccount(req, res) {
    validate.validateCreateAccount(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { userId, accountNumber, accountType, balance } = req.body;
      Accounts.findOne({ userId }, (err, account) => {
        if (err) {
          res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!account) {
          let newAccount = new Accounts({ accountNumber, accountType, balance, userId });
          newAccount.save(() => {
            if (err)
              return res.send(err);
            // give some success message
            res.status(201).json({
              status: 201,
              message: 'account successfully created!',
              newAccount
            });
          });
        } else {
          return res.status(409).json({
            message: 'User account already has an account'
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
   * @returns 
   * @memberof Account
   */
  getBalance(req, res) {
    validate.validateGetBalance(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { id, accountNumber } = req.body;
      User.findOne({ accountNumber, id }, (err, account) => {
        if (err) {
          return res.send('internal server error')
        }
        if (!account) {
          return res.send('no account found')
        }
        return res.status(200).json({
          status: 200,
          account
        });
      })
    }
  }

  /**
   * 
   * 
   * @param {any} amount 
   * @memberof Account
   */
  deposite(req, res) {
    validate.validateDeposite(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { username, accountNumber, credit, detail, sender, referenceNo } = req.body;
      
      User.findOne({ 'local.username': username }, (err, result) => {
        console.log(err, result);
        if (err) return res.send(err);
        if(!result) {
          req.flash('adminMessage', 'User does not exist');
          res.redirect('/admin/dashboard');          
          return;
        }
        const amount = result.local.balance + Number(credit)
        User.update({ 'local.username':username }, { $set: { 'local.balance': amount } }, (err, updated) => {
          if (err){ 
              req.flash('adminMessage', err.message);
              res.redirect('/admin/dashboard');
              return;
          }else{
            let newTransaction = new Transactions(
              {
                accountNumber: accountNumber,
                detail: detail,
                sender: sender,
                credit: credit,
                referenceNo: referenceNo,
                username: username, 
              });

              newTransaction.save((err) => {
                if (err) {
                  req.flash('adminMessage',  'Deposite was unsuccessful')
                  res.redirect('/admin/dashboard')
                  return;
                }else{
                  req.flash('adminMessage', 'Deposite made successfully');
                  res.redirect('/admin/dashboard');
                }               
              })
          }
        })
            
       })
    }
  }

  /**
   * 
   * 
   * @param {any} amount 
   * @memberof Account
   */
  transfer(req, res) {
    validate.validateDeposite(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { userId, accountNumber, amount } = req.body;
      Accounts.findOne({ accountNumber, userId }, (err, account) => {
        if (err) {
          return res.send('internal server error')
        }
        if (!account) {
          req.flash('adminMessage', 'account does not exist');
          res.redirect('/admin/dashboard');          
          return;
        }
        if (account) {
          Accounts.findOneAndUpdate({ accountNumber }, { $set: { balance: account.balance -= amount } }, (err, result) => {
            if (err)
              return res.send(err)
            req.flash('adminMessage', 'User does not exist');
            res.redirect('/admin/dashboard');          
            // return;
          })
        }
      })
    }
  }

  /**
   * 
   * 
   * @param {any} amount 
   * @memberof TransactionHistory
   */
  transactionHistory(req, res) {
    const user = {
      id: req.user._id,
      username: req.user.local.username,
      sex: req.user.local.sex,
      firstname: req.user.local.firstname,
      lastname: req.user.local.lastname,
      address: req.user.local.address,
      email: req.user.local.email,
      city: req.user.local.city,
      state: req.user.local.state,
      phone: req.user.local.phone,
      zipcode: req.user.local.zipcode,
      account: req.user.local.accountNumber,
      balance: req.user.local.balance
    }
    const username = req.user.local.username
      Transactions.find({ username : username }, null, { sort : { created_at : -1 }}, (err, history) => {
        res.render('profile.ejs', { user, history});
      });
    }
  }
module.exports = new Account();