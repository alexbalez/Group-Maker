const mongoose = require('mongoose');

const Students = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    semester:{
        type: Number,
        required: true,
        trim: true
    }
});

const Student = mongoose.model("Student", Students, "students");
module.exports = Student;
