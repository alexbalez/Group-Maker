const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]
})

const Rating = mongoose.model("Ratings", RatingSchema);
module.exports = Rating;