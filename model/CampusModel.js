const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colleges"
    },
    programs: [
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

const Campus = mongoose.model("Campuses", CampusSchema);
module.exports = Campus;