const express = require('express');
const campusModel = require('../../model/CampusModel');
const app = express();

// Create
app.post('/campus', async (req, res) => {
  const campus = new campusModel(req.body);
  try {
    await campus.save();
    res.send(campus);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get('/campuses', async (req, res) => {
  const campus = await campusModel.find({});
  try {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(campus);
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/campus/:id', async(req,res) => {
    console.log(req.params.id)
    const campus = await campusModel.findById(req.params.id);
    try {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.send(campus);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch('/campus/:id', async (req, res) => {
    try {
      await campusModel.findByIdAndUpdate(req.params.id, req.body)
      await campusModel.save()
      res.send({result:"edit success"})
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete('/campus/:id', async (req, res) => {
    try {
      const campus = await campusModel.findByIdAndDelete(req.params.id)
      if (!campus) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })


app.patch('/campus-add-program/:campusId/:programId', async (req, res) => {
  const tempCampusId = req.params.campusId;
  const tempProgramId = req.params.programId;
  try {
    const campus = await campusModel.findByIdAndUpdate(
      { _id: tempCampusId },
      { $addToSet: {programs: tempProgramId }},
      { new: true, useFindAndModify: false}
    )

    if(!campus) res.status(404).send("No Campus found!")
    await campus.save();
    res.end();
  } catch (err) {
    res.status(500).send(err)
  }
})

app.patch('/campus-remove-program/:campusId/:programId', async (req, res) => {
  const tempCampusId = req.params.campusId;
  const tempProgramId = req.params.programId;
  try {
    const campus = await campusModel.findByIdAndUpdate(
      { _id: tempCampusId },
      { $pull: { programs: tempProgramId }},
      { new: true, useFindAndModify: false}
    )

    await campus.save();
    res.end();
  } catch {
    res.status(500).send(err);
  }
})

module.exports = app

