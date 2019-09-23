
import validate from '../middleware/validate';
import Account from '../models/account';
import User from '../models/User';
import { sendSuccessfulTransfer } from '../utils/sendMail';
import {getDateToday} from '../utils/pagination';
var mongoose = require('mongoose');

/**
 *
 *
 * @class Accounts
 */
class Accounts {
 
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns {void}
   * @memberof Account
   */
  getBalance(req, res) {
    validate.validateGetBalance(req, res);
    const errors = req.validationErrors();
    if (errors) {
      return res.send(errors);
    }

    const { id, accountNumber } = req.body;
    User.findOne({ accountNumber, id }, (err, account) => {
      if (err) {
        return res.send('internal server error');
      }
      if (!account) {
        return res.send('no account found');
      }
      return res.status(200).json({
        status: 200,
        account
      });
    });
  }


  /**
    * 
    * 
    * @param {any} amount 
    * @memberof Account
    */
  transfer(req, res) {
    const userId = req.decoded.id;
    const {
      balance,
      email,
      receiverBank,
      receiverName,
      receiverAccountNumber,
      swiftCode,
      ibanNumber,
      amountToTransfer,
      transferDescription,
} = req.body;
    if (!receiverBank && !receiverName && !receiverAccountNumber
      && !swiftCode && !ibanNumber && !amountToTransfer && !email
      && !transferDescription, !userId) {
      return res.status(400).send({
        message: 'Please provide missing fields'
      });
    }
    User.findOne({
      _id: userId
    }).then((userFound) => {
      if (userFound) {
        if (userFound.isActive === false) {
          return res.status(400).send({
            message: 'Token Unavailable'
          });
        }
        if (Number(userFound.balance) < Number(amountToTransfer)) {
          return res.status(400).send({
            message: 'Insufficient fund'
          });
        }
        const updateBal = {
          $set: {
            balance: Number(userFound.balance) - Number(amountToTransfer)
          },
        };
        User.findByIdAndUpdate(req.decoded.id, updateBal, { new: true })
          .then(updatedDetails => {
            if (updatedDetails) {
              const account = new Account({
                email: email.trim().toLowerCase(),
                receiverBank: receiverBank.trim().toLowerCase(),
                receiverName: receiverName.trim().toLowerCase(),
                receiverAccountNumber: receiverAccountNumber.trim().toLowerCase(),
                swiftCode: swiftCode.trim().toLowerCase(),
                ibanNumber: ibanNumber.trim().toLowerCase(),
                amountToTransfer: amountToTransfer.trim().toLowerCase(),
                transferDescription: transferDescription.trim().toLowerCase(),
                transactionType: 'debit',
                date: getDateToday(),
                userId
              });
              account.save().then((transferSuccess) => {
                sendSuccessfulTransfer(
                  transferSuccess.email,
                  transferSuccess.receiverBank,
                  transferSuccess.receiverName, 
                  transferSuccess.receiverAccountNumber,
                  transferSuccess.amountToTransfer, 
                  userFound.balance, 
                  userFound.username
                );
                if (transferSuccess) {
                  res.status(201).send({
                    message: 'Transfer successfull',
                    transferSuccess
                  });
                }
              });
            }
          });
      }
    }).catch(err => {
      res.state(500).send({
        err
      });
    });
  }

  /**
   * 
   * @return {void }
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @memberof Account
   */
  deposit(req, res) {
    let { id } = req.query;
    const {
      amountToTransfer,
      transferDescription,
      date
    } = req.body;
    if (amountToTransfer === '' && transferDescription === '' && id === '' && date === '') {
      return res.status(400).send({
        message: 'Please provide missing fields'
      });
    }
    User.findOne({ _id: id }).then((clientFound) => {
      if (!clientFound) {
        return res.status(404).send({
          message: 'user not found'
        });
      }
      if (clientFound) {
        const updateBal = {
          $set: {
            balance: Number(clientFound.balance) + Number(amountToTransfer),
          },
        };
        User.findByIdAndUpdate(req.query.id, updateBal, { new: true })
          .then(updatedDetails => {
            if (updatedDetails) {
              const account = new Account({
                amountToTransfer: amountToTransfer.trim().toLowerCase(),
                transferDescription: transferDescription.trim().toLowerCase(),
                transactionType: 'credit',
                date: date || getDateToday(),
                userId: mongoose.Types.ObjectId(id) 
              });
              account.save().then((depositeSuccess) => {
                if (depositeSuccess) {
                  res.status(201).send({
                    message: 'Deposite was successfull',
                    depositeSuccess
                  });
                }
              }).catch((err)=> {
               return console.log(err)
              })
            }
          });
      }
    }).catch(err => {
      res.status(500).send({
        err
      });
    });
  }
}


module.exports = new Accounts();
