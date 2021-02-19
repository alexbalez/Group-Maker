const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoute = require('./routes/studentRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const port = 5000;

// Config Log
console.log(result.parsed);

// cookies middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(studentRoute);
app.use(authRoute); //authRoute exports express.Router()
app.use(userRoute);

// MongoDB Connection
//const DB_URL = "mongodb+srv://thiago:mypassword@cluster0.siwfc.mongodb.net/group-maker?retryWrites=true&w=majority";
const DB_URL = "mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/gbc_fullstack?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server")
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    
app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
})

// Server
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
/*
const https = require('https')
//const http = require('http')
const fs = require('fs')
var httpskey  = fs.readFileSync('./client/certs/joina.group.key', 'utf8');
var httpscert = fs.readFileSync('./client/certs/joina.group.crt', 'utf8');

var credentials = {key: httpskey, cert: httpscert}
//var httpServer = https.createServer(app).listen(5000)
/*
var httpsServer = https.createServer(credentials, app)
httpsServer.listen(3001);
*/

//https.get('/', (res) => {res.send('got')})

//^^^ https doesn't work here lmao
/////////// testing cookies ///////////////////

app.get('/set-cookies', (req, res) => {

    // sets cookie called newUser with value of true
    //access programmatically with document.cookie
    //res.setHeader('Set-Cookie', 'newUser=true');

    // using cookie middlware:

    res.cookie('newUser', false); //sets a cookie called new user with value true
    
    //set cookie to keep user logged in for one day (max age in ms)
    //httpOnly: true means that cookie is not accessible in js console. only through http
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    
    //set cookie for use with only https (secure: true)
    //res.cookie('isEmployee', true, { maxAge: 1000 * 3600 * 24, secure: true });

    res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

    // once cookies are set, as long as the cookies are alive, every request has those cookies attached
    const cookies = req.cookies;
    

    res.json(cookies);

});
