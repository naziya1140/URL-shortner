import  express from 'express';
import { connectToMongoDB } from './connect.js';
import  path  from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const domain = process.env.DOMAIN || 'http://localhost';
const PORT = process.env.PORT || 8000;
const uri = process.env.MONGO_URI;

//connecting with database.
connectToMongoDB(uri);

//Middlewares.
app.use(express.urlencoded({extended: false}));//supports form data parsing.
app.use(express.json());//supports json data.
app.use(cookieParser())//helps in parsing cookie data.
app.use(express.static('public'));//makes the public directory accessible to all the files.

app.set('view engine', 'ejs');//setting the view engine as ejs.
app.set('views', path.resolve('./views'));//directing to views file for UI.

//importing routes.
import { urlRoute } from './routes/url.js';
import { indexRoute } from './routes/staticRouter.js';
import { userRoute } from './routes/user.js';
import { restrictToLoginUser} from './middlewares/auth.js';

app.use('/url', restrictToLoginUser, urlRoute);
app.use('/users', userRoute);
app.use('/', indexRoute);

app.listen(PORT, ()=>{
    console.log(`Server Running at ${domain}:${PORT}`)
});
