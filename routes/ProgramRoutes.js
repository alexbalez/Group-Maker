const express = require('express');
const programModel = require('./../model/ProgramModel');
const app = express();

// Create
app.post('/program', async (req, res) => {
  const program = new programModel(req.body);
  try {
    await program.save();
    res.send(program);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/programs', async (req, res) => {
  const program= await programModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(program);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/program/:id', async(req,res) => {
    console.log(req.params.id)
    const program = await programModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(program);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/program/:id', async (req, res) => {
    try {
      await programModel.findByIdAndUpdate(req.params.id, req.body)
      await programModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/program/:id', async (req, res) => {
    try {
      const program = await programModel.findByIdAndDelete(req.params.id)
      if (!program) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

