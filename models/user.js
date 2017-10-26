const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({
    local : {
        email : {
         type: String,
         required: true
        },
        password: {
          type: String,
          required: true
         },
         confirmPassword:{
           type: String
         },
        firstname: {
          type: String,
          required: true
         },
        lastname: {
          type: String,
          required: true
         },
        username: {
          type: String,
          required: true
         },
        sex: {
          type: String,
          required: true
         },
         accountNumber: {
          type: Number,
          min: [6, 'enter atleast six numbers'],
          required: true
         },
        accountType:{
          type: String,
          required: true
        },
        balance:{
          type: Number,
          required: true
        },
        zipcode: Number,
        address:String,
        city: String,
        state: String,
        phone: {
          type: Number,
          required: true 
        },
        maritalStatus:String,
        nationality: String,
        identificationNumber: {
          type: Number,
          required: true
         },
        
        dob: {
          type: String,
          required: true
         },
    }
  },
    { timestamps: { createdAt: 'created_at' }
    
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
