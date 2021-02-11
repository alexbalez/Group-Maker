const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoute = require('./routes/studentRoute');
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
