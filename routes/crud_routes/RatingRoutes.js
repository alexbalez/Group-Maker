const express = require('express');
const ratingModel = require('../../model/RatingModel');
const app = express();

// Create
app.post('/rating', async (req, res) => {
  const rating = new ratingModel(req.body);
  try {
    await rating.save();
    res.send(rating);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/ratings', async (req, res) => {
  const rating = await ratingModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(rating);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/rating/:id', async(req,res) => {
    console.log(req.params.id)
    const rating = await ratingModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(rating);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/rating/:id', async (req, res) => {
    try {
      await ratingModel.findByIdAndUpdate(req.params.id, req.body)
      await ratingModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/rating/:id', async (req, res) => {
    try {
      const rating = await ratingModel.findByIdAndDelete(req.params.id)
      if (!rating) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app

