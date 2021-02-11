const express = require('express');
const projectModel = require('./../model/ProjectModel');
const app = express();

// Create
app.post('/project', async (req, res) => {
  const project = new projectModel(req.body);
  try {
    await project.save();
    res.send(project);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/projects', async (req, res) => {
  const project = await projectModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(project);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/project/:id', async(req,res) => {
    console.log(req.params.id)
    const project = await projectModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(project);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/project/:id', async (req, res) => {
    try {
      await projectModel.findByIdAndUpdate(req.params.id, req.body)
      await projectModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/project/:id', async (req, res) => {
    try {
      const project = await projectModel.findByIdAndDelete(req.params.id)
      if (!project) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

