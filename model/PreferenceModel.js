const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    weight: {
        type: Number,
        required: true,
        trim: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]
})

const Preference = mongoose.model("Preferences", PreferenceSchema);
module.exports = Preference;