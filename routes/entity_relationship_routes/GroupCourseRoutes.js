const express = require('express');
const groupModel = require('./../../model/GroupModel');
const courseModel = require('./../../model/CourseModel')
const app = express();


// Create
app.post('/groupcourseadd/:groupId/:courseId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.groupId)
  console.log(req.params.courseId)
  tempGroupId = req.params.groupId;
  tempCourseId = req.params.courseId;
  console.log(res)

  try {

    console.log('hello')
    console.log
    const group = await groupModel.findByIdAndUpdate(
        {_id: tempGroupId},
        { $set: { course: tempCourseId } },
        { new: true, useFindAndModify: false }
    )
    const course = await courseModel.findByIdAndUpdate(
        {_id: tempCourseId},
        { $addToSet: { groups: tempGroupId } },
        { new: true, useFindAndModify: false }
    )

    await course.save()
    await group.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/groupcoursedelete/:groupId/:courseId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.groupId)
  console.log(req.params.courseId)
  tempGroupId = req.params.groupId;
  tempCourseId = req.params.courseId;

  try {
    console.log('hello')
  
    const group = await groupModel.findByIdAndUpdate(
      { _id: tempGroupId},
      { $unset: {course: tempCourseId} },
      { new: true, useFindAndModify: false }
    )
    const course = await courseModel.findByIdAndUpdate(
      {_id: tempCourseId},
      { $pull: { groups: tempGroupId } },
      { new: true, useFindAndModify: false }
    )

    await course.save()
    await group.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app