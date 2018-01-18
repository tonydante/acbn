import express from 'express';
import accounts from '../controller/accounts';
import { Users, Admins } from '../controller'
import validateInput from '../utils/validateInput';
import jwtVerify from '../utils/jwtVerify';


const router = express.Router();



router.get('/', (req, res) => {
  res.render('home.ejs');
});



//new end points
router.post('/user/signup', validateInput.signupInput, Users.signup);
router.post('/user/signin', validateInput.signInInput, Users.signin);
router.get('/user/useraccountdetails', jwtVerify.verifyToken, Users.getUserDetails);
router.post('/user/update', jwtVerify.verifyToken, Users.updateUser);
router.post('/admin/signup', validateInput.adminInput, Admins.adminSignup);
router.post('/admin/signin', validateInput.adminInput, Admins.adminSignin);


//---------||-------\\
router.get('/createaccount', (req, res) => {
  res.render('createaccount.ejs', { message: req.flash('signupMessage') });
});

router.get('/connect/local', (req, res) => {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});


// ADMIN SECTION 
router.get('/createaccount/:_id', (req, res) => {
  res.render('profile.ejs', {
    userId: req.params._id
  });
})

router.get('/api/user/accountdetails/:id', Users.accountDetails);

router.post('/api/createaccount', accounts.createAccount);
router.post('/api/accounts/user', accounts.getBalance);
router.post('/admin/deposite', accounts.deposite);
router.post('/admin/withdraw', accounts.withdraw);

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