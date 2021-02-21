const express = require('express');
const groupModel = require('./../../model/GroupModel');
const collegeModel = require('./../../model/CollegeModel')
const app = express();


// Create
app.post('/groupcollegeadd/:groupId/:collegeId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.groupId)
  console.log(req.params.collegeId)
  tempGroupId = req.params.groupId;
  tempCollegeId = req.params.collegeId;
  console.log(res)

  try {

    console.log('hello')
    console.log
    await groupModel.findByIdAndUpdate(
        {_id: tempGroupId},
        { $set: { college: tempCollegeId } },
        { new: true, useFindAndModify: false }
    )
    const college = await collegeModel.findByIdAndUpdate(
        {_id: tempCollegeId},
        { $addToSet: { groups: tempGroupId } },
        { new: true, useFindAndModify: false }
    )
    groupModel.save()
    await college.save()
    await group.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/groupcollegedelete/:groupId/:collegeId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.groupId)
  console.log(req.params.collegeId)
  tempGroupId = req.params.groupId;
  tempCollegeId = req.params.collegeId;

  try {
    console.log('hello')
  
    const group = await groupModel.findByIdAndUpdate(
      { _id: tempGroupId},
      { $unset: {college: tempCollegeId} },
      { new: true, useFindAndModify: false }
    )
    const college = await collegeModel.findByIdAndUpdate(
      {_id: tempCollegeId},
      { $pull: { groups: tempGroupId } },
      { new: true, useFindAndModify: false }
    )

    await college.save()
    await group.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app