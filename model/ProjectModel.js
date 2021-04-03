const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    assigneddate: {
        type: Date
    },
    duedate: {
        type: Date
    },
    weight: {
        type: Number,
        required: true,
        trim: true, 
    },
    mingroupsize: {
        type: Number,
        required: true,
        trim: true
    },
    maxgroupsize: {
        type: Number,
        required: true,
        trim: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
    },
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

const Project = mongoose.model("Projects", ProjectSchema);
module.exports = Project;