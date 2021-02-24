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
        type: String,
    },
    campus: {
        type: String,
    },
    program: {
        type: String,
    },
    course: {
        type: String,
    },
    project: {
        type: String,
    },
    users: [
        {
            type: [String],
        }
    ],
    preferences: [
        {
            type: [String],
            required: false
        }
    ]
});

const Group = mongoose.model("Groups", GroupSchema);
module.exports = Group;
