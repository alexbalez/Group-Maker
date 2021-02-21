const express = require('express');
const userModel = require('./../../model/UserModel');
const ratingModel = require('./../../model/RatingModel')
const app = express();


// Create
app.post('/userratingadd/:userId/:ratingId', async (req, res)  => {
  await res.append('Access-Control-Allow-Origin', ['*']);
  console.log(req.params.userId)
  console.log(req.params.ratingId)
  tempUserId = req.params.userId;
  tempRatingId = req.params.ratingId;
  console.log(res)

  try {

    console.log('hello')

    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $addToSet: {ratings: tempRatingId} },
      { new: true, useFindAndModify: false }
    )
    const rating = await ratingModel.findByIdAndUpdate(
      {_id: tempRatingId},
      { $addToSet: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await rating.save()
    await user.save()
    // res.append('Access-Control-Allow-Origin', ['*']);
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// Remove
app.post('/userratingdelete/:userId/:ratingId', async (req, res) => {
  await res.append('Access-Control-Allow-Origin', ['*'])
  console.log(req.params.userId)
  console.log(req.params.ratingId)
  tempUserId = req.params.userId;
  tempRatingId = req.params.ratingId;

  try {
    console.log('hello')
  
    const user = await userModel.findByIdAndUpdate(
      { _id: tempUserId},
      { $pull: {ratings: tempRatingId} },
      { new: true, useFindAndModify: false }
    )
    const rating = await ratingModel.findByIdAndUpdate(
      {_id: tempRatingId},
      { $pull: { users: tempUserId } },
      { new: true, useFindAndModify: false }
    )

    await rating.save()
    await user.save()
    res.end()
  }
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app