const express = require('express');
const userModel = require('./../../model/UserModel');
const preferenceModel = require('./../../model/PreferenceModel')
const app = express();


// Create
app.post('/userpreferenceadd/:userId/:preferenceId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.preferenceId)
  tempUserId = req.params.userId;
  tempPreferenceId = req.params.preferenceId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {preferences: tempPreferenceId} },
      { new: true, useFindAndModify: false }
    )
    const preference = await preferenceModel.findByIdAndUpdate(
      {_id: tempPreferenceId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await preference.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/userpreferencedelete/:userId/:preferenceId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.preferenceId)
  tempUserId = req.params.userId;
  tempPreferenceId = req.params.preferenceId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {preferences: tempPreferenceId} },
      { new: true, useFindAndModify: false }
    )
    const preference = await preferenceModel.findByIdAndUpdate(
      {_id: tempPreferenceId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await preference.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app