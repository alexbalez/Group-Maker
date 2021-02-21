const express = require('express');
const preferenceModel = require('../../model/PreferenceModel');
const app = express();

// Create
app.post('/preference', async (req, res) => {
  const preference = new preferenceModel(req.body);
  try {
    await preference.save();
    res.send(preference);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/preferences', async (req, res) => {
  const preference = await preferenceModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(preference);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/preference/:id', async(req,res) => {
    console.log(req.params.id)
    const preference = await preferenceModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(preference);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/preference/:id', async (req, res) => {
    try {
      await preferenceModel.findByIdAndUpdate(req.params.id, req.body)
      await preferenceModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/preference/:id', async (req, res) => {
    try {
      const preference = await preferenceModel.findByIdAndDelete(req.params.id)
      if (!preference) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

