const express = require('express');
const userModel = require('../../model/UserModel');
const roleModel = require('../../model/RoleModel');

const campusModel = require('../../model/CampusModel');
const programModel = require('../../model/ProgramModel');
const collegeModel = require('../../model/CollegeModel');


const app = express();



const { requireAuth } = require('../../auth/authMiddleware');

// this uses the requreAuth middleware to check that there is a valid token on the client
// the requireAuth middleware also attaches the userid from the token to the req object
app.get('/dashboard', requireAuth, async (req, res) => {
  console.log(req.userid)
  const user = await userModel.findById({ _id: req.userid })
  try {
    console.log(user)
    res.json(user);
  }
  catch (err) {
    res.status(500).send(err);
  }

});

//created this route in order to get info for filling out student profile in one request to the server
app.get('/additional-data/:collegeId', requireAuth, async (req, res) => {
  
  const _college = await collegeModel.findById(req.params.collegeId)

  const _campuses = await campusModel.find(
    { '_id': { $in: _college.campuses } }, 
    {address: 1, name:1, programs:1}
  )
  
  let campus_progIds = []
  for (c of _campuses){
    campus_progIds = campus_progIds.concat(c.programs)
  }
  
  const _programs = await programModel.find(
    {'_id': { $in: campus_progIds } }, 
    {code:1, courses:1, name:1}
  )

  try {
    //console.log(_college)
    res.json({campuses: _campuses, programs: _programs});
  }
  catch (err) {
    res.status(500).send(err);
  }

});

// Create
//This function is handled in authRoute.js through the /signup route

// app.post('/user', async (req, res) => {
//   const user = new userModel(req.body);
//   try {
//     await user.save();
//     res.send(user);
//   }
//   catch (err) {
//     res.status(500).send(err);
//   }
// });

// Retrieve
app.get('/users', async (req, res) => {
  const users = await userModel.find({});
  const roles = await roleModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    var data = {
      "userList" : users, 
      "roleList" : roles
    }
    res.send(data);
    // res.send(users)
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/user/:id', async(req,res) => {
    console.log(req.params.id)
    const user = await userModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
//todo: add requireAuth here
app.patch('/user/:id', requireAuth, async (req, res) => {
  
  //only allow a user to update their own information
  if (!req.params.id === req.userid){
    res.status(401).json({ error: "Not authorized" });
  }
    
  try {
    const updatedStudent = await userModel.findByIdAndUpdate(
      req.params.id, req.body, 
      { new: true, useFindAndModify:false}
    )

    //TODO: make sure user id is added to all of the preferences
    //


    res.send(updatedStudent)
    res.end()
  } 
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/user/:id', async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id)
      if (!user) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

