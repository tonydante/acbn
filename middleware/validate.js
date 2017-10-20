const validate = {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  validateLogin(req, res) {
    req
      .checkBody("username", "Enter a valid email address.")
      .isEmail();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
  },

  validateSignup(req, res) {
    req
      .checkBody("username", "First name cannot be empty.")
      .notEmpty();
    req
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
  },

  /**
   * validate creation of an account
   * 
   * @param {any} req 
   * @param {any} res 
   */
  validateCreateAccount(req, res) {
    req
      .checkBody("accountNumber", "account number can't be empty.")
      .notEmpty();
    req
      .check('accountNumber', 'account number  must be at least 6 numbers long or more')
      .isLength({ min: 6 })
    req
      .check(  
        'accountNumber',
        'account Number must be a number and one that is divisible by 2'
      ).isNumeric()
    req
      .checkBody("accountType", "account type can't be empty.")
      .notEmpty();
    req
      .checkBody("deposite", "deposite can't be empty.")
      .notEmpty();

  },

  /**
   * validate get balence  of user account
   * 
   * @param {any} req 
   * @param {any} res 
   */
  validateGetBalance(req, res) {
    req
      .checkBody("accountNumber", "account number can't be empty.")
      .notEmpty();
    req
      .check('accountNumber', 'account number  must be at least 6 numbers long or more')
      .isLength({ min: 6 })
    req
      .check(  
        'accountNumber',
        'account Number must be a number and one that is divisible by 2'
      ).isNumeric()

  },

   /**
   * validate get balence  of user account
   * 
   * @param {any} req 
   * @param {any} res 
   */
  validateDeposite(req, res) {
    req
      .checkBody("accountNumber", "account number can't be empty.")
      .notEmpty();
    req
      .check('accountNumber', 'account number  must be at least 6 numbers long or more')
      .isLength({ min: 6 })
    req
      .check(  
        'accountNumber',
        'account Number must be a number'
      ).isNumeric()
    req
      .checkBody("amount", "account number can't be empty.")
      .notEmpty();
    req
      .check('amount', 'account number  must be at least 2 numbers long or more')
      .isLength({ min: 2 })
    req
      .check(  
        'amount',
        'amount must be a number'
      ).isNumeric()
  },

  validateId(req, res, id) {
      if (typeof id !== "number") {
        res.json({Message: "Id is a valid number"});
      } else 
      return id;
  }

};

export default validate;