const express = require('express');
const groupModel = require('./../../model/GroupModel');
const projectModel = require('./../../model/ProjectModel')
const app = express();


// Create
app.post('/groupprojectadd/:groupId/:projectId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.groupId)
  console.log(req.params.projectId)
  tempGroupId = req.params.groupId;
  tempProjectId = req.params.projectId;
  console.log(res)

  try {

    console.log('hello')
    console.log
    const group = await groupModel.findByIdAndUpdate(
        {_id: tempGroupId},
        { $set: { project: tempProjectId } },
        { new: true, useFindAndModify: false }
    )
    const project = await projectModel.findByIdAndUpdate(
        {_id: tempProjectId},
        { $addToSet: { groups: tempGroupId } },
        { new: true, useFindAndModify: false }
    )

    await project.save()
    await group.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/groupprojectdelete/:groupId/:projectId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.groupId)
  console.log(req.params.projectId)
  tempGroupId = req.params.groupId;
  tempProjectId = req.params.projectId;

  try {
    console.log('hello')
  
    const group = await groupModel.findByIdAndUpdate(
      { _id: tempGroupId},
      { $unset: {project: tempProjectId} },
      { new: true, useFindAndModify: false }
    )
    const project = await projectModel.findByIdAndUpdate(
      {_id: tempProjectId},
      { $pull: { groups: tempGroupId } },
      { new: true, useFindAndModify: false }
    )

    await project.save()
    await group.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app