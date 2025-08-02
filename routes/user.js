import { renderSignupPage, handleSignup, renderLoginPage, handleLogin, handleLogout, deleteURL} from '../controllers/user.js';
import { loginAuth, logoutAuth} from '../middlewares/auth.js';
import express from 'express';

const userRoute = express.Router();

// Signup routes with signup authentication middleware
userRoute
.route('/signup')
.get(loginAuth, renderSignupPage)
.post(handleSignup);

// Login routes with login authentication middleware
userRoute
.route('/login')
.get(loginAuth, renderLoginPage)
.post(handleLogin);

//Logout route
userRoute
.post('/logout', logoutAuth, handleLogout);

//Route for deleting URL.
userRoute
.delete('/delete/:url', deleteURL);

export {
    userRoute
}
