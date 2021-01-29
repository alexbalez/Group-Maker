const mongoose = require('mongoose');

const Students = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    semester:{
        type: String,
        required: true,
        trim: true
    }
});

const Student = mongoose.model("Student", Students, "students");
module.exports = Student;
