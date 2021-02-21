const express = require('express');
const userModel = require('./../../model/UserModel');
const projectModel = require('./../../model/ProjectModel')
const app = express();


// Create
app.post('/userprojectadd/:userId/:projectId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.projectId)
  tempUserId = req.params.userId;
  tempProjectId = req.params.projectId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {projects: tempProjectId} },
      { new: true, useFindAndModify: false }
    )
    const project = await projectModel.findByIdAndUpdate(
      {_id: tempProjectId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await project.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/userprojectdelete/:userId/:projectId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.projectId)
  tempUserId = req.params.userId;
  tempProjectId = req.params.projectId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {projects: tempProjectId} },
      { new: true, useFindAndModify: false }
    )
    const project = await projectModel.findByIdAndUpdate(
      {_id: tempProjectId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await project.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app