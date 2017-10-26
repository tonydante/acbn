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
      // req.flash('adminMessage',  '<h1>Heyo</h1>')
      res.send(errors);
      // res.redirect('/admin/dashboard')
      return;
    } else {
      const { username, accountNumber, credit, detail, sender } = req.body;
      console.log(req.body)
      let newTransaction = new Transactions({ username, accountNumber, credit, detail, sender });
      newTransaction.save((err) => {
        if (err) {
          req.flash('adminMessage',  'Deposite was unsuccessful')
          res.redirect('/admin/dashboard')
          // return res.send(err)
        }
        newTransaction
        req.flash('adminMessage', 'Deposite made successfully');
        res.redirect('/admin/dashboard');
      })
    }
  }

  // /**
  //  * 
  //  * 
  //  * @param {any} amount 
  //  * @memberof Account
  //  */
  // withdraw(req, res) {
  //   validate.validateDeposite(req, res);
  //   var errors = req.validationErrors();
  //   if (errors) {
  //     res.send(errors);
  //     return;
  //   } else {
  //     const { userId, accountNumber, amount, details } = req.body;
  //     User.findOne({ accountNumber, userId }, (err, account) => {
  //       if (err) {
  //         return res.status(500).json({
  //           status: 500,
  //           err: err,
  //           message: "internal server error"
  //         })
  //       }
  //       if (!account) {
  //         return res.send('user not found')
  //       }
  //       if (account) {
  //         if (account.balance < amount) {
  //           return res.send('insufficient funds')
  //         }
  //         Accounts.findOneAndUpdate({ accountNumber },
  //           {
  //             $set:
  //             {
  //               balance: account.balance -= amount
  //             }
  //           }, (err, result) => {
  //             if (err)
  //               return res.send(err)
  //             const { accountType, balance, userId } = result;
  //             let withdrawal = `\$${amount}`
  //             let newTransaction = new Transactons({ accountType, details, withdrawal, balance, userId });
  //             newTransaction.save();
  //             return res.status(200).json({
  //               status: 200,
  //               message: "Account Updated",
  //               data: result
  //             });
  //           })
  //       }
  //     })
  //   }
  // }

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
          return res.send('User not found')
        }
        if (account) {
          Accounts.findOneAndUpdate({ accountNumber }, { $set: { balance: account.balance -= amount } }, (err, result) => {
            if (err)
              return res.send(err)

            res.status(200).json({
              status: 200,
              message: "Account Updated",
              result
            });
          })
        }
      })
    }
  }
}
module.exports = new Account();