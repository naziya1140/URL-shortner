import { getUserbySessionId } from '../services/auth.js';

async function restrictToLoginUser(req, res, next) {
    try{
        const sId = req.cookies?.uid;//fetching session id from cookie.
        if (!sId) return res.redirect('/users/login'); 
        const user = await getUserbySessionId(sId);//feching user from database.
        if (!user) return res.redirect('/users/login');
        req.user = user;//setting this as the user so that in the 
        next();
    }
    catch(e){
        console.log(e);
    }
}

async function loginAuth(req, res, next) {
    try{
        //This method makes sure that the user on url page can't jump to login page.
        const sId = req.cookies?.uid;//extracting session ID.
        if (sId) {
            const user = await getUserbySessionId(sId);
            // If user is already logged in, redirect them to URL page
            if (user) {
                return res.redirect('/url');
            }
        }
    
        // For POST requests or if user is not logged in, continue to the next middleware
        next();
    }
    catch(e){
        console.log(e);
    }
}

async function logoutAuth(req, res, next) {
    try{
        const userid = req.cookies?.uid;
        if (!userid) {
            // If no session exists, redirect to login
            return res.redirect('/users/login');
        }
        const user = getUserbySessionId(userid);
        if (!user) {
            // If session is invalid, redirect to login
            return res.redirect('/users/login');
        }
        // User is authenticated, proceed with handlelogout function.
        next();
    }
    catch(e){
        console.log(e);
    }
}

async function mainpageAuth(req, res, next) {
    try{
        const sId = req.cookies?.uid;
        //if already logged in then redirect them to url.
        if(sId){
            const user = getUserbySessionId(sId);
            if(user) return res.redirect('/url');
        }
        next();
    }
    catch{
        console.log(e);
    }
}

export {
    restrictToLoginUser,
    loginAuth,
    logoutAuth,
    mainpageAuth
}