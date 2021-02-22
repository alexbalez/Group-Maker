const express = require('express');
const userModel = require('./../../model/UserModel');
const groupModel = require('./../../model/GroupModel')
const app = express();


// Create
app.post('/usergroupadd/:userId/:groupId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.groupId)
  tempUserId = req.params.userId;
  tempGroupId = req.params.groupId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {groups: tempGroupId} },
      { new: true, useFindAndModify: false }
    )
    const group = await groupModel.findByIdAndUpdate(
      {_id: tempGroupId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await group.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/usergroupdelete/:userId/:groupId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.groupId)
  tempUserId = req.params.userId;
  tempGroupId = req.params.groupId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {groups: tempGroupId} },
      { new: true, useFindAndModify: false }
    )
    const group = await groupModel.findByIdAndUpdate(
      {_id: tempGroupId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await group.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app