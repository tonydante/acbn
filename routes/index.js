import  admin from '../cotrollers/siteAdmin';
import accounts from '../cotrollers/accounts';
import users from '../cotrollers/users';
console.log(admin.adminSignup);
/**
 * 
 * route middleware to ensure user is logged in
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 * @returns 
 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}


/**
 * 
 * @param {any} app 
 * @param {any} passport 
 */
module.exports = (app, passport) => {

  // show the home page (will also have our login links)
  app.get('/', (req, res) => {
    res.render('home.ejs');
  });

  // PROFILE SECTION 
  app.get('/profile', isLoggedIn, (req, res) => {  
   
    accounts.transactionHistory(req, res)
    // res.render('profile.ejs', { user: user, trans : trans  });
  });

  // LOGOUT
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));


  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/createaccount', (req, res) => {
    res.render('createaccount.ejs', { message: req.flash('signupMessage') });
  });
   // process the signup form
   app.post('/createaccount', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/createaccount',
    failureFlash: true
  }));
  // locally 
  app.get('/connect/local', (req, res) => {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  
  // ADMIN SECTION 
  app.get('/createaccount/:_id', (req, res) => {
    res.render('profile.ejs', {
      userId: req.params._id
    });
  })
  app.get('/admin/dashboard', admin.getAllUsers);
  app.post('/admin/signup', admin.adminSignup);
  app.get('/admin/signup', (req, res)=>{
    res.render('admin/signup.ejs', { message: req.flash('adminMessage')})
  })
  app.get('/api/user/accountdetails/:id', users.accountDetails);
  app.post('/admin/signin',admin.adminLogin);
  app.get('/admin/signin', (req, res) => {
    res.render('admin/siginin.ejs', { message: req.flash('adminMessage')})
  })
  app.post('/api/createaccount', accounts.createAccount);
  app.post('/api/accounts/user', accounts.getBalance);
  app.post('/admin/deposite', accounts.deposite);
  app.post('/admin/withdraw', accounts.withdraw);
  app.get('/app/user/token',isLoggedIn, (req, res) => {
    res.render('token.ejs');
  })
  app.get('/app/about', (req, res) => {
    res.render('about-us/board-of-directors/index.ejs');
  })
  app.get('/app/aboutus', (req, res) => {
    res.render('about-us/about-us.ejs');
  })
  app.get('/account', (req, res) => {
    res.render('accounts/visa-debit-card.ejs')
  })
  app.get('/app/contactus', (req, res) => {
    res.render('about-us/contact-us.ejs');
  })
  app.get('/service', (req, res) => {
    res.render('services-tools/tools/index.ejs');
  })
  app.get('/loans', (req, res) => {
    res.render('loans/business-loans/index.ejs');
  })
  // app.get('*', (req, res) => {
  //   res.status(404).render('home.ejs');
  // });
};

