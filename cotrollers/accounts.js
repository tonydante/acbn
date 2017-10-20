"use strict"
import validator from 'express-validator';
import validate from '../middleware/validate';
import Accounts from '../models/account';
import Transactons from '../models/transaction';


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
          newAccount.save((err) => {
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
      const { userId, accountNumber } = req.body;
      Accounts.findOne({ accountNumber, userId }, (err, account) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'no account found'
          })
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
      const { userId, accountNumber, amount } = req.body;
      Accounts.findOne({ accountNumber, userId }, (err, account) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'user not found'
          })
        }
        if (account) {
          Accounts.findOneAndUpdate({ accountNumber }, { $set: { balance: account.balance += amount } }, (err, result) => {
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

  /**
   * 
   * 
   * @param {any} amount 
   * @memberof Account
   */
  withdraw(req, res) {
    validate.validateDeposite(req, res);
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      const { userId, accountNumber, amount, details } = req.body;
      Accounts.findOne({ accountNumber, userId }, (err, account) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'user not found'
          })
        }
        if (account) {
          if (account.balance < amount) {
            return res.json({
              err: 'Insuficient funds'
            })
          }
          Accounts.findOneAndUpdate({ accountNumber },
            {
              $set:
              {
                balance: account.balance -= amount
              }
            }, (err, result) => {
              if (err)
                return res.send(err)
              const { accountType, balance, userId } = result;
              let withdrawal = `\$${amount}`
              console.log(result);
              console.log(withdrawal, details)
              let newTransaction = new Transactons({ accountType, details, withdrawal, balance, userId });
              console.log(newTransaction.balance)
              newTransaction.save();
              return res.status(200).json({
                status: 200,
                message: "Account Updated",
                data: result
              });
            })
        }
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
          return res.status(500).json({
            status: 500,
            err: err,
            message: "internal server error"
          })
        }
        if (!account) {
          return res.status(400).json({
            status: 400,
            error: 'user not found'
          })
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
  getOneTransaction(req, res){

  }
  getAllTransactions(req, res){

  }
}
module.exports = new Account();