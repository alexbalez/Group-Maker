const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colleges"
    },
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campuses"
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "programs"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    preferences: [
        {
            type: String,
            required: false
        }
    ]
});

const Group = mongoose.model("Groups", GroupSchema);
module.exports = Group;
