var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local : {
        accountNumber : String,
        accountType: String,
        deposite: Number,
        userId : Number
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
