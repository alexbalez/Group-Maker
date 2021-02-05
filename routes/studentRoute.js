const Student = require('../model/Student');
const express = require('express');
const app = express();

// Create Student
app.post('/students-create', async (req, res) => {
    // Validate body is not empty
    if(!req.body) {
        return res.status(400).send({message: "Body cannot be empty"});
    }

    const student = new Student(req.body);
    try{
        await student.save();
        res.send(student);
    }catch(err){
        console.log(req.body);
        console.log(err );
        res.status(500).send(err);
    }
});

// Get Student by email
app.get('/students/:studentEmail', async (req, res) => {
    // Validate body is not empty
    if(!req.body) {
        return res.status(400).send({message: "Body cannot be empty"});
    }

    console.log("Looking for student with email: " + req.params.studentEmail);
    const student = await Student.findOne({email: studentEmail});
    try{
        res.send(student);
    }catch(err){ res.status(500).send(err); }
});

// Get all Students
app.get('/students', async(req, res) => {
    const students = await Student.find({});
    try{
        res.send(students);
    }catch(err){ res.status(500).send(err); }
});

module.exports = app;
