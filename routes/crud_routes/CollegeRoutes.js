const express = require('express');
const collegeModel = require('../../model/CollegeModel');
const app = express();

// Create
app.post('/college', async (req, res) => {
  const college = new collegeModel(req.body);
  try {
    await college.save();
    res.send(college);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/colleges', async (req, res) => {
  const colleges = await collegeModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(colleges);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/college/:id', async(req,res) => {
    console.log(req.params.id)
    const college = await collegeModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(college);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/college/:id', async (req, res) => {
    try {
      await collegeModel.findByIdAndUpdate(req.params.id, req.body)
      await collegeModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/college/:id', async (req, res) => {
    try {
      const college = await collegeModel.findByIdAndDelete(req.params.id)
      if (!college) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

