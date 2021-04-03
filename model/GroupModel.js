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
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'colleges'
    },
    campus: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'campuses'
    },
    program: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'programs'
    },
    course: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'courses'
    },
    project: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'projects'
    },
    users: [
        {
            type: [String],
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "users"
        }
    ],
    preferences: [
        {
            type: [String],
            required: false
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "preferences"
        }
    ]
});

const Group = mongoose.model("Groups", GroupSchema);
module.exports = Group;
