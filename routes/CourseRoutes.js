const express = require('express');
const courseModel = require('./../model/CourseModel');
const app = express();

// Create
app.post('/course', async (req, res) => {
  const course = new courseModel(req.body);
  try {
    await course.save();
    res.send(course);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/courses', async (req, res) => {
  const course= await courseModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(course);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/course/:id', async(req,res) => {
    console.log(req.params.id)
    const course = await courseModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(course);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/course/:id', async (req, res) => {
    try {
      await courseModel.findByIdAndUpdate(req.params.id, req.body)
      await courseModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/course/:id', async (req, res) => {
    try {
      const course = await courseModel.findByIdAndDelete(req.params.id)
      if (!course) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

