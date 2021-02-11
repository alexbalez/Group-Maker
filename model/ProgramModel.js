const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
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
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campuses"
    },
    courses: [
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

const Program = mongoose.model("Programs", ProgramSchema);
module.exports = Program;