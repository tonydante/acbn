import express from 'express';
import { Users, Admins, Accounts } from '../controller';
import validateInput from '../utils/validateInput';
import jwtVerify from '../utils/jwtVerify';
const router = express.Router();



// router.get('/', (res) => {
//   res.send({ express: 'Hello From Express' });
// });

// new end points
router.post('/user/signup', validateInput.signupInput, Users.signup);
router.post('/user/signin', validateInput.signInInput, Users.signin);
router.post('/admin/signup', validateInput.adminInput, Admins.adminSignup);
router.post('/admin/signin', validateInput.adminInput, Admins.adminSignin);
router.get('/user/useraccountdetails', jwtVerify.verifyToken, Users.getUserDetails);
router.post('/user/update', jwtVerify.verifyToken, Users.updateUser);
router.get('/admin/clients', jwtVerify.verifyToken, Admins.getAllUsers);
router.get('/admin/client', jwtVerify.verifyToken, Admins.getOneUser);
router.put('/admin/client', jwtVerify.verifyToken, Users.updateUser);
router.put('/admin/deposit', jwtVerify.verifyToken, Accounts.deposit);
router.post('/user/transfer', jwtVerify.verifyToken, Accounts.transfer);
router.put('/admin/client/updateusertoken', jwtVerify.verifyToken, Users.updateUser);
router.delete('/admin/client', jwtVerify.verifyToken, Admins.deleteUser);
router.get('/user/transactions', jwtVerify.verifyToken, Users.getTransationDetails);

export default router;
