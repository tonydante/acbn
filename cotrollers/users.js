
"use strict"

const Users = require('../models/user');

class User{

  // constructor(bal){
  //   tihs.balance = bal;
  // }
  retrieveAllUsers(req, res){
    Users.find({}, (err, data)=>{
      if (err) {
        res.send('no user found')
      }
      res.render()
    })
  }
  accountDetails(req, res){
    Users.findOne({username}, (err, user)=>{
      if (err) {
        res.send('no user found')
      }
      res.render('/accountdetails.ejs', {user})
    })
  }
}

module.exports = new User();