const express = require('express');
const userModel = require('./../model/UserModel');
// const roleModel = require('../models/RoleModel')
const app = express();

// Create
app.post('/user', async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/users', async (req, res) => {
  const users = await userModel.find({});
//   const roles = await roleModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    // var data = {
    //   "userList" : users, 
    //   "roleList" : roles
    // }
    // res.send(data);
    res.send(users)
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
app.patch('/user/:id', async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, req.body)
      await userModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
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

