import { Stream } from 'stream';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the schema for our user model
const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
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
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  provice: {
    type: String
  },
  accountType: {
    type: String,
    required: true
  },
  expiryTime: Date,
  passwordToken: String,
  address: String,
  maritalStatus: String,
  city: String,
  nationality: String,
  state: String,
  dob: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  accountNumber: {
    type: Number,
    min: [6, 'enter atleast six numbers'],
    required: true
  },
  availableCredit: {
    type: String,
    required: true,
    default: "0"
  },
  currentCreditLimitedAmount: {
    type: String,
    required: true,
    default: "0"
  },
  lastPaymentDate: {
    type: String,
    required: true,
  },
  lastPaymentAmt: {
    type: String,
    required: true,
    default: "0"
  },
  totalMinAmtDue: {
    type: String,
    required: true,
    default: "15"
  },
  paymentDueDate: {
    type: String,
    required: true
  },
  pendingBal: {
    type: String,
    required: true,
    default: 0
  },
  rewardBal: {
    type: Number,
    required: true,
    default: 0
  },
  lastLogin: {
    type: Date,
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  zipcode: Number,
  identificationNumber: {
    type: Number,
    required: true
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }

  });

const SALT_WORK_FACTOR = 10;

userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);
export default User;