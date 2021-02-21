const express = require('express');
const userModel = require('./../../model/UserModel');
const programModel = require('./../../model/ProgramModel')
const app = express();


// Create
app.post('/userprogramadd/:userId/:programId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.programId)
  tempUserId = req.params.userId;
  tempProgramId = req.params.programId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {programs: tempProgramId} },
      { new: true, useFindAndModify: false }
    )
    const program = await programModel.findByIdAndUpdate(
      {_id: tempProgramId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await program.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/userprogramdelete/:userId/:programId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.programId)
  tempUserId = req.params.userId;
  tempProgramId = req.params.programId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {programs: tempProgramId} },
      { new: true, useFindAndModify: false }
    )
    const program = await programModel.findByIdAndUpdate(
      {_id: tempProgramId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await program.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app