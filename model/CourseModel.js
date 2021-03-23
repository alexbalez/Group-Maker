const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    code: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campuses"
    },
    semester: {
        type: Number,
    },
    projects: [
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

const Course = mongoose.model("Courses", CourseSchema);
module.exports = Course;