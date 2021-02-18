const express = require('express');
const userModel = require('./../../model/UserModel');
const collegeModel = require('./../../model/CollegeModel')
const app = express();


// Create
app.post('/usercollegeadd/:userId/:collegeId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.collegeId)
  tempUserId = req.params.userId;
  tempCollegeId = req.params.collegeId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {colleges: tempCollegeId} },
      { new: true, useFindAndModify: false }
    )
    const college = await collegeModel.findByIdAndUpdate(
      {_id: tempCollegeId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await college.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/usercollegedelete/:userId/:collegeId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.collegeId)
  tempUserId = req.params.userId;
  tempGollegeId = req.params.collegeId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {colleges: tempCollegeId} },
      { new: true, useFindAndModify: false }
    )
    const college = await collegeModel.findByIdAndUpdate(
      {_id: tempCollegeId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await college.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app