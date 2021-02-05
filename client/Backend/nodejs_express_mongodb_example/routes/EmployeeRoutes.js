const express = require('express');
const employeeModel = require('../models/Employee');
const app = express();

// Create
app.post('/employee', async (req, res) => {
  const employee = new employeeModel(req.body);
  try {
    await employee.save();
    res.send(employee);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

//Example JSON body to create record and conform to employee mongoose schema
/*
  {
    "firstname": "Michael",
    "lastname": "Jackson",
    "salary": "10000000"
  }
*/

// Retrieve
app.get('/employees', async (req, res) => {
  const employees = await employeeModel.find({});
  try {
    //not ideal to allow all
    //check this https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets
    //res.append('Access-Control-Allow-Origin', ['*']);
    res.send(employees);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});


//retrieve one employee
app.get('/employee/:id', async (req, res) =>{
  const employee = await employeeModel.findById(req.params.id, (err)=>{
      console.log(err)
    })

    try{
      res.send(employee)
    }
    catch (err){
      res.status(500).send(err)
    }
})

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/employee/:id', async (req, res) => {
  try {
    await employeeModel.findByIdAndUpdate(req.params.id, req.body)
    //await employeeModel.save()
    res.send({result:"edit success"})
    res.end()
  } 
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

//Delete
// localhost:8081/employee/5d1f6c3e4b0b88fb1d257237
app.delete('/employee/:id', async (req, res) => {
    try {
      const employee = await employeeModel.findByIdAndDelete(req.params.id)
      if (!employee) res.status(404).send("No item found")
      res.status(200).send()
    } 
    catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app