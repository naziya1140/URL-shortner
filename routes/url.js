import {HandleInsertNewUrl, getPage} from '../controllers/url.js'//importing controllers.
import express from 'express';

const urlRoute = express.Router();

// The message is passing to '/' because it is already in url.
urlRoute
.route('/')
.post(HandleInsertNewUrl)
.get(getPage);

export{
    urlRoute,
}


