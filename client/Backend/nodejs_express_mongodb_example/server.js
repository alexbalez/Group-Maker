const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');

//not sure if this will work in terms of security but cors is required to allow access to the api
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
//ex 'mongodb+srv://sa:s3cr3t@cluster0.qa3t4.mongodb.net/gbc-fall2020?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/gbc_fullstack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(employeeRouter);

app.listen(8081, () => { console.log('Server is running on port 8081') });