const express = require('express');
const groupModel = require('./../../model/GroupModel');
const campusModel = require('./../../model/CampusModel')
const app = express();


// Create
app.post('/groupcampusadd/:groupId/:campusId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.groupId)
  console.log(req.params.campusId)
  tempGroupId = req.params.groupId;
  tempCampusId = req.params.campusId;
  console.log(res)

  try {

    console.log('hello')
    console.log
    const group = await groupModel.findByIdAndUpdate(
        {_id: tempGroupId},
        { $set: { campus: tempCampusId } },
        { new: true, useFindAndModify: false }
    )
    const campus = await campusModel.findByIdAndUpdate(
        {_id: tempCampusId},
        { $addToSet: { groups: tempGroupId } },
        { new: true, useFindAndModify: false }
    )

    await campus.save()
    await group.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/groupcampusdelete/:groupId/:campusId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.groupId)
  console.log(req.params.campusId)
  tempGroupId = req.params.groupId;
  tempCampusId = req.params.campusId;

  try {
    console.log('hello')
  
    const group = await groupModel.findByIdAndUpdate(
      { _id: tempGroupId},
      { $unset: {campus: tempCampusId} },
      { new: true, useFindAndModify: false }
    )
    const campus = await campusModel.findByIdAndUpdate(
      {_id: tempCampusId},
      { $pull: { groups: tempGroupId } },
      { new: true, useFindAndModify: false }
    )

    await campus.save()
    await group.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app