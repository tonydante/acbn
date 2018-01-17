import express from 'express';
import admin from '../controller/siteAdmin';
import accounts from '../controller/accounts';
import { Users } from '../controller'
import validateInput from '../utils/validateInput';
import jwtVerify from '../utils/jwtVerify';


const router = express.Router();
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

// ========= User Routes ========

router.get('/', (req, res) => {
  res.render('home.ejs');
});

// PROFILE SECTION 
router.get('/profile', isLoggedIn, (req, res) => {

  accounts.transactionHistory(req, res)
  // res.render('profile.ejs', { user: user, trans : trans  });
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
//new end points
router.post('/user/signup', validateInput.signupInput, Users.signup);
router.post('/user/signin', validateInput.signInInput, Users.signin);
router.get('/user/useraccountdetails', jwtVerify.verifyToken, Users.getUserDetails);
router.post('/user/update', jwtVerify.verifyToken, Users.updateUser);


// process the login form
router.post('/login', Users.signup);


router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});
// process the signup form
// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true
//   }));
// process the signup form
// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/signup',
//   failureFlash: true
// }));

router.get('/createaccount', (req, res) => {
  res.render('createaccount.ejs', { message: req.flash('signupMessage') });
});
// process the signup form
// router.post('/createaccount', passport.authenticate('local-signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/createaccount',
//   failureFlash: true
// }));
// locally 
router.get('/connect/local', (req, res) => {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
// router.post('/connect/local', passport.authenticate('local-signup', {
//   successRedirect: '/profile', // redirect to the secure profile section
//   failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
//   failureFlash: true // allow flash messages
// }));


// ADMIN SECTION 
router.get('/createaccount/:_id', (req, res) => {
  res.render('profile.ejs', {
    userId: req.params._id
  });
})
router.get('/admin/dashboard', admin.getAllUsers);
router.post('/admin/signup', admin.adminSignup);
router.get('/admin/signup', (req, res) => {
  res.render('admin/signup.ejs', { message: req.flash('adminMessage') })
})
router.get('/api/user/accountdetails/:id', Users.accountDetails);
router.post('/admin/signin', admin.adminLogin);
router.get('/admin/signin', (req, res) => {
  res.render('admin/siginin.ejs')
})
router.post('/api/createaccount', accounts.createAccount);
router.post('/api/accounts/user', accounts.getBalance);
router.post('/admin/deposite', accounts.deposite);
router.post('/admin/withdraw', accounts.withdraw);
router.get('/router/user/token', isLoggedIn, (req, res) => {
  res.render('token.ejs');
})
router.get('/router/about', (req, res) => {
  res.render('about-us/board-of-directors/index.ejs');
})
router.get('/router/aboutus', (req, res) => {
  res.render('about-us/about-us.ejs');
})
router.get('/account', (req, res) => {
  res.render('accounts/visa-debit-card.ejs')
})
router.get('/router/contactus', (req, res) => {
  res.render('about-us/contact-us.ejs');
})
router.get('/service', (req, res) => {
  res.render('services-tools/tools/index.ejs');
})
router.get('/loans', (req, res) => {
  res.render('loans/business-loans/index.ejs');
})
router.get('/zohoverify/verifyforzoho.html', (req, res) => {
  res.render('zohoverify/verifyforzoho.html')
})


export default router;