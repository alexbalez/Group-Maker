const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    campuses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects"
        }
    ],
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "groups"
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]
})

const College = mongoose.model("Colleges", CollegeSchema);
module.exports = College;