import  admin from '../cotrollers/siteAdmin';
console.log(admin.adminSignup);
/**
 * 
 * @param {any} app 
 * @param {any} passport 
 */
module.exports = (app, passport) => {

  // show the home page (will also have our login links)
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  // LOGOUT ==============================
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

  // locally --------------------------------
  app.get('/connect/local', (req, res) => {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  
  // ADMIN SECTION =========================
  app.get('/createaccount/:_id', (req, res) => {
    res.render('profile.ejs', {
      userId: req.params._id
    });
  })
  app.get('/admin/dashboard', admin.getAllUsers);
  app.post('/admin/signup', admin.adminSignup)
  app.post('/admin/signin',admin.adminLogin)
  
};

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