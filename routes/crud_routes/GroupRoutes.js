const express = require('express');
const groupModel = require('../../model/GroupModel');
const app = express();

// Create
app.post('/group', async (req, res) => {
  const group = new groupModel(req.body);
  try {
    await group.save();
    res.send(group);
  }
  catch (err) {
      console.log(err);
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/groups', async (req, res) => {
  const groups = await groupModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(groups);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

//Get groups containing :name (no case)
app.get('/groups/:name/', async(req,res) => {
  const group = await groupModel.find({
    'name': { $regex: req.params.name, $options:'i' }
  }, 'id name description').exec((err, search) => {
    console.log(err)
    if (err) res.status(500).send(err)
    console.log(search)
  })
  try {
      res.append('Access-Control-Allow-Origin', ['*']); 
      res.send(group);
  }
  catch (err) {
      res.status(500).send(err);
  }
});

app.get('/group/:id', async(req,res) => {
    console.log(req.params.id)
    const group = await groupModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(group);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/group/:id', async (req, res) => {
    try {
      await groupModel.findByIdAndUpdate(req.params.id, req.body)
      await groupModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/group/:id', async (req, res) => {
    try {
      const group = await groupModel.findByIdAndDelete(req.params.id)
      if (!group) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

