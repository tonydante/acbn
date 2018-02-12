import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';
import Account from '../models/account';
import { resetPassword, sendSuccessfulReset } from '../utils/sendMail';

mongoose.Promise = global.Promise;
"use strict";

// const Users = require('../models/user');


export default {
  /**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signup(req, res) {
    User.findOne({
      userId: req.body.userId.trim().toLowerCase()
    }).then((userId) => {
      if (userId) {
        return res.status(409).send({
          error: 'user with that userId already exist'
        });
      }
      User.findOne({
        username: req.body.username.trim().toLowerCase()
      })
        .then((username) => {
          if (username) {
            return res.status(409).send({
              error: 'user with that username already exist'
            });
          }
          const user = new User({
            firstname: req.body.firstname.trim().toLowerCase(),
            lastname: req.body.lastname.trim().toLowerCase(),
            username: req.body.username.trim().toLowerCase(),
            userId: req.body.userId.trim().toLowerCase(),
            password: req.body.password,
            email: req.body.email.trim().toLowerCase(),
            gender: req.body.gender.trim().toLowerCase(),
            zipcode: req.body.zipcode,
            address: req.body.address.trim().toLowerCase(),
            province: req.body.province.trim().toLowerCase(),
            maritalStatus: req.body.maritalStatus.trim().toLowerCase(),
            city: req.body.city.trim().toLowerCase(),
            state: req.body.state.trim().toLowerCase(),
            nationality: req.body.nationality.trim().toLowerCase(),
            accountType: req.body.accountType.trim().toLowerCase(),
            dob: req.body.dob,
            phone: req.body.phone,
            identificationNumber: req.body.identificationNumber,
            accountNumber: req.body.accountNumber,
            lastPaymentDate: req.body.lastPaymentDate,
            paymentDueDate: req.body.paymentDueDate,
            firstToken: false,
            isActive: false
          });
          user.save().then((newUser) => {
            const token = jwt.sign(
              {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
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
            .catch((error) => res.status(400).send(error.message));
        }).catch((err) => res.status(400).send({ err }));
    }).catch((err) => res.status(400).send({ err }));
  },

  /**
   * signina new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  // signin(req, res) {
  //   User.findOne({
  //     userId: req.body.userId.trim().toLowerCase()
  //   }).exec().then((user) => {
  //     if (!user) {
  //       return res.status(404).send({
  //         error: 'Failed to authenticate user'
  //       });
  //     }
  //     if (!bcrypt.compareSync(req.body.password, user.password)) {
  //       return res.status(401).send({
  //         error: 'Failed to authenticate user'
  //       });
  //     }
  //     if (user) {
  //       const token = jwt.sign(
  //         {
  //           id: user.id,
  //           username: user.username,
  //           email: user.email
  //         },
  //         process.env.SECRET,
  //         { expiresIn: 24 * 60 * 60 }
  //       );
  //       return res.status(201).send({
  //         token,
  //         message: `Welcome back ${user.username}`
  //       });
  //     }
  //   })
  //     .catch((error) => {
  //       res.status(500).send({
  //         error: error.message
  //       });
  //     });
  // },
  async signin(req, res) {
    const obj = {
      userId: req.body.userId.trim().toLowerCase()
    }
 try{
    const user = await User.findOne(obj).exec();
    if(!user) {
      return res.status(404).send({
        error: 'Failed to authenticate user'
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        error: 'Failed to authenticate user'
      });
    }
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email
        },
        process.env.SECRET,
        { expiresIn: 24 * 60 * 60 }
      );
      return res.status(201).send({
        token,
        message: `Welcome back ${user.username}`
      });
    }
 } catch(error) {
        res.status(500).send({
          error: error.message
        });
      }
  },
  /**
   * @method forgotPassword
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves user email and creates password token i the database
   */
  forgotPassoword(req, res) {
    const hash = crypto.randomBytes(20).toString('hex');
    const date = Date.now() + 3600000;
    if (!req.body.email) {
      return res.status(401).send({
        message: 'Please provide your email'
      });
    }
    const promise = User.findOne({
      email: req.body.email.trim().toLowerCase()
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'Account associated with this email not found'
        });
      }
      user.passwordToken = hash;
      user.expiryTime = date;
      user.save().then((updatedUser) => {
        resetPassword(updatedUser.passwordToken, updatedUser.email, req.headers.host);
        return res.status(202).send({
          message: 'A link has has been sent to your mail',
          passwordToken: updatedUser.passwordToken
        });
      })
        .catch((error) => {
          res.status(500).send({
            error: error.message
          });
        });
    });
  },

  /**
   * @method reset
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves new password details and updates user password in the database User table
   */
  resetPassword(req, res) {
    const promise = User.findOne({
      passwordToken: req.params.token
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'failed token authentication'
        });
      } if (
        req.body.newPassword &&
        req.body.confirmPassword &&
        req.body.newPassword === req.body.confirmPassword) {
        const currentTime = Date.now() + 1800000;
        if (currentTime > user.expiryTime) {
          user.passwordToken = null;
          user.expiryTime = null;
          return res.status(410).send({
            success: false,
            message: 'Expired link'
          });
        }
        user.password = req.body.newPassword;
        user.save().then((updatedUser) => {
          sendSuccessfulReset(updatedUser.email);
          return res.status(201).send({
            message: 'Password has been updated',
            updatedUser
          });
        })
          .catch((error) => {
            res.status(404).send({
              error: error.message
            });
          });
      } else {
        return res.status(400).send({
          success: false,
          error: 'Please confirm passwords'
        });
      }
    });
  },

  /**
 * @method updateUser
 * @param {*} req
 * @param {*} res
 * @returns {object} response- an object containing either successful response or error message
 * @description receives request with new user details and update the user
 */
  updateUser(req, res) {
    const userDetails = {
      $set: req.body,
    };
    User.findByIdAndUpdate(req.query.id, userDetails, { new: true })
      .then(updatedDetails => {
        if (updatedDetails) {
          return res.status(202).send({
            message: 'User Info updated successfully',
            updatedDetails
          });
        }
        return res.status(403).send({
          error: 'could not find user with this id'
        });
      })
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  /**
   * 
   * Gets a user's transactions record
   * @param {any} req 
   * @param {any} res 
   * @return {void}
   */
  getTransationDetails(req, res) {
    const queryUser = Account.find({ userId: req.decoded.id })
      .sort({ created_at: 'desc' });
    queryUser.select(`transferDescription
    amountToTransfer transactionType 
    receiverBank date`);

    queryUser.then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User  does not exist'
        });
      }
      return res.status(200).send({
        user,
      });
    });
  },

  /**
   * 
   * Gets a user's detail
   * @param {any} req 
   * @param {any} res 
   * @return {void}
   */
  getUserDetails(req, res) {
    const queryUser = User.findById(req.decoded.id);
    queryUser.select(`firstname lastname username email  
    accountNumber balance availableCredit 
    currentCreditLimitedAmount lastPaymentDate 
    lastPaymentAmt totalMinAmtDue paymentDueDate 
    rewardBal lastLogin pendingBal gender
    nationality address state phone identificationNumber isActive`);

    queryUser.then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User  does not exist'
        });
      }
      return res.status(200).send({
        user,
      });
    });
  },
};
