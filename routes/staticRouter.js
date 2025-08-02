import express from 'express';
import { logAndRedirectUrl, renderMainPage} from '../controllers/index.js';
import { mainpageAuth } from '../middlewares/auth.js';

const indexRoute = express.Router();

//Home page.
indexRoute.get('/', mainpageAuth, renderMainPage );

// where shortid will be dynamic Request--> for redirecting to old url when a new request on newURL is made.
indexRoute.get('/:shortId', logAndRedirectUrl);

export {
    indexRoute,
}