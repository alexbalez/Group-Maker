const express = require('express');
const userModel = require('./../../model/UserModel');
const campusModel = require('./../../model/CampusModel')
const app = express();


// Create
app.post('/usercampusadd/:userId/:campusId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.campusId)
  tempUserId = req.params.userId;
  tempCampusId = req.params.campusId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {campuses: tempCampusId} },
      { new: true, useFindAndModify: false }
    )
    const campus = await campusModel.findByIdAndUpdate(
      {_id: tempCampusId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await campus.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/usercampusdelete/:userId/:campusId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.campusId)
  tempUserId = req.params.userId;
  tempCampusId = req.params.campusId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {campuses: tempCampusId} },
      { new: true, useFindAndModify: false }
    )
    const campus = await campusModel.findByIdAndUpdate(
      {_id: tempCampusId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await campus.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app