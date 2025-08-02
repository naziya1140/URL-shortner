import { userData } from "../models/user.js";
import { authData } from "../models/auth.js";
import { urlData } from "../models/url.js";
import { setSessionId } from "../services/auth.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import  validator from 'email-validator';


function renderLoginPage(req, res) {
    res.render('login', {error: null, success: null});
}

async function handleLogin(req, res) {
    try {
        const body = req.body;
        if (!body.email || !body.password) {
            return res.status(400).json({ error: 'Fill All Fields!' });
        }
        const user = await userData.findOne({ email: body.email });//finding user in database with same email.
        if (!user) {
            return res.redirect('/users/signup');
        }
        const checkPass = await bcrypt.compare(body.password, user.password);
        if (checkPass) {
            // Create session after successful login
            const sessionId = uuidv4();//creating new session id.
            await setSessionId(user, sessionId);//adding in the authdata collection.
            res.cookie('uid', sessionId);//uid is the name of cookie.
            return res.redirect('/url');
        }
        else {
            return res.render('login', {error: 'Incorrect Password! Please Try Again', success: null});
        }
    }
    catch (e) {
        return res.render('login', {error: 'Error Occured during Login! Please Try Again', success: null});
    }
}


function renderSignupPage(req, res) {
    return res.render('signup', {error: null, success: null}); // Render the signup page with no errors or success messages
}


async function handleSignup(req, res) {
    try {
        const data = req.body;
        if (!data.username || !data.email || !data.password) {
            return res.render('signup', {error: 'Please fill all fields', success: null});
        }
        const existingUser = await userData.findOne({ email: data.email });// Check if user already exists
        if (existingUser) {
            return res.render('signup', {error: 'User already exists with this email', success: null});
        }
        const isValidEmail = validator.validate(data.email);
        if (!isValidEmail) {
            return res.render('signup', {error: 'Please enter a valid email address', success: null});
        }

        const hashPassword = await bcrypt.hash(data.password, 10);// Create new user with Hashed Password
        const newUser = await userData.create({
            name: data.username,
            email: data.email,
            password: hashPassword,
        });
        return res.redirect('/users/login'); // once the user has signed up, redirect it to login page.
    }
    catch (e) {
        return res.render('signup', {error: 'Error Occured during Signup! Please Try Again', success: null});
    }
}

async function handleLogout(req, res) {
    try {
        const id = req.cookies.uid;
        res.clearCookie('uid');//clear the cookie with name uid.
        await authData.findOneAndDelete({ sessionId: id });//deleting from database.
        return res.status(200).end();//successfully Logged Out.
    } catch{
         return res.render('signup', {error: 'Error Occured while Logging Out! Please Try Again', success: null});
    }
}

async function deleteURL(req, res) {
    try {
        const urlId = req.params.url;
        if (urlId) {
            await urlData.findOneAndDelete({ _id: urlId });
            console.log(urlId);
            res.status(204).end();
        }
    }
    catch (e) {
        console.error('Logout error:', e);
        res.render('login', {error: 'Error occurred during logout', success: null});
    }
}

export {
    renderSignupPage,
    handleSignup,
    renderLoginPage,
    handleLogin,
    handleLogout,
    deleteURL
}