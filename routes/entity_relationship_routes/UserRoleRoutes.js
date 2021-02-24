const express = require('express');
const userModel = require('./../../model/UserModel');
const roleModel = require('./../../model/RoleModel')
const app = express();


// Create
app.post('/userroleadd/:userId/:roleId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.roleId)
  tempUserId = req.params.userId;
  tempRoleId = req.params.roleId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {roles: tempRoleId} },
      { new: true, useFindAndModify: false }
    )
    const role = await roleModel.findByIdAndUpdate(
      {_id: tempRoleId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await role.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/userroledelete/:userId/:roleId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.roleId)
  tempUserId = req.params.userId;
  tempRoleId = req.params.roleId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {roles: tempRoleId} },
      { new: true, useFindAndModify: false }
    )
    const role = await roleModel.findByIdAndUpdate(
      {_id: tempRoleId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await role.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app