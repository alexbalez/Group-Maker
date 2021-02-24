const express = require('express');
const groupModel = require('./../../model/GroupModel');
const programModel = require('./../../model/ProgramModel')
const app = express();


// Create
app.post('/groupprogramadd/:groupId/:programId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.groupId)
  console.log(req.params.programId)
  tempGroupId = req.params.groupId;
  tempProgramId = req.params.programId;
  console.log(res)

  try {

    console.log('hello')
    console.log
    const group = await groupModel.findByIdAndUpdate(
        {_id: tempGroupId},
        { $set: { program: tempProgramId } },
        { new: true, useFindAndModify: false }
    )
    const program = await programModel.findByIdAndUpdate(
        {_id: tempProgramId},
        { $addToSet: { groups: tempGroupId } },
        { new: true, useFindAndModify: false }
    )

    await program.save()
    await group.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/groupprogramdelete/:groupId/:programId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.groupId)
  console.log(req.params.programId)
  tempGroupId = req.params.groupId;
  tempProgramId = req.params.programId;

  try {
    console.log('hello')
  
    const group = await groupModel.findByIdAndUpdate(
      { _id: tempGroupId},
      { $unset: {program: tempProgramId} },
      { new: true, useFindAndModify: false }
    )
    const program = await programModel.findByIdAndUpdate(
      {_id: tempProgramId},
      { $pull: { groups: tempGroupId } },
      { new: true, useFindAndModify: false }
    )

    await program.save()
    await group.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app