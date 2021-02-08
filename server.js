const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoute = require('./routes/studentRoute');
const https = require('https')
const fs = require('fs')

//https certificates
const privkey = fs.readFileSync('/etc/letsencrypt/live/joina.group/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/joina.group/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/joina.group/chain.pem', 'utf8');
const credentials = {
	key: privkey,
	cert: certificate,
	ca: ca
};

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
// 	console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });

const authRoute = require('./routes/authRoute');

const app = express();
const port = 5000;

// Config Log
console.log(result.parsed);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors);

app.use(studentRoute);
app.use(authRoute); //authRoute exports express.Router()

// MongoDB Connection
//const DB_URL = "mongodb+srv://thiago:mypassword@cluster0.siwfc.mongodb.net/group-maker?retryWrites=true&w=majority";
const DB_URL = "mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/gbc_fullstack?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Server
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
