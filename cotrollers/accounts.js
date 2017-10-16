"use strict"
const Accounts = require('../models/account');

class Account{

  /**
   * 
   * 
   * @param {any} userId 
   * @param {any} accoun 
   * @memberof Account
   */
  createAccount(req, res){
    const { userId, accountNumber, accountType, deposite, userId } = req.body;
    Accounts.findById({ userId: userId }, (err,  account) =>{
      if(err){
        res.status(500).json({
          status: 500,
          err: err,
          message : "internal server error"
        })
      }
      if(!userId){
        db.Accounts.insertOne({
          accountNumber: accountNumber,
          accountType: accountType,
          deposite: deposite,
          userId: userId
        }, (accountCreadted) =>{
          if (accountCreadted) {
            res.status(201).json({
              status: 201,
              data: accountCreadted,
              message : "Account created"
            })
          }else{
            return res.status(400).json({ 
              message: 'An error occured '
            });
          }
        });
      }else{
        return res.status(409).json({ 
          message: 'User already has an account' 
        });
      }
    })
  }

  getBalance(accountNumber){
    Accounts.findOne({where: { accountNumber: accountNumber }}, (account) =>{
      if(account){
       res.status(200).json({
        status: 200, data : account.balance
       });
      }
    })
    }
  
    deposite(amount){
      //balance += amount;
      Accounts.findOne({where: { accountNumber: accountNumber }}, (account) =>{
        if(account){
          Account.update({ accountNumber : accountNumber },{$set: { balance: balance+= amount }}, (result) =>{
            if(result){
              res.status(200).json({
                status: 200, message : "Account Updated"
              });
            }
          })
        }
      })
    }
  
    witdraw(amount){
      Accounts.findOne({where: {accountNumber: accountNumber }}, (account) =>{
        if(account){
          if(amount > account.balance){
            res.status(400).json({
              status: 400, message : "Insufficient fund"
            });
          }
          Account.update({ accountNumber : accountNumber },{$set: { balance: balance-= amount }}, (result) =>{
            if(result){
              res.status(200).json({
                status: 200, message : "Account Updated"
              });
            }
          })
        }
      })
    }
  
    transfer(amount){
      Accounts.findOne({where: {accountNumber: accountNumber }}, (account) =>{
        if(account){
          if(amount > account.balance){
            res.status(400).json({
              status: 400, message : "Insufficient fund"
            });
          }
          Account.update({ accountNumber : accountNumber },{$set: { balance: balance-= amount }}, (result) =>{
            if(result){
              res.status(200).json({
                status: 200, message : "Account Updated"
              });
            }
          })
        }
      })
    }
}
module.exports = new Account();