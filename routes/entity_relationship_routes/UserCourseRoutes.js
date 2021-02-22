const express = require('express');
const userModel = require('./../../model/UserModel');
const courseModel = require('./../../model/CourseModel')
const app = express();


// Create
app.post('/usercourseadd/:userId/:courseId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.courseId)
  tempUserId = req.params.userId;
  tempCourseId = req.params.courseId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {courses: tempCourseId} },
      { new: true, useFindAndModify: false }
    )
    const course = await courseModel.findByIdAndUpdate(
      {_id: tempCourseId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await course.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/usercoursedelete/:userId/:courseId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.courseId)
  tempUserId = req.params.userId;
  tempCourseId = req.params.courseId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {courses: tempCourseId} },
      { new: true, useFindAndModify: false }
    )
    const course = await courseModel.findByIdAndUpdate(
      {_id: tempCourseId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await course.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app