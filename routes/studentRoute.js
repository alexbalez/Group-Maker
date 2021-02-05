const Student = require('../model/Student');
const express = require('express');
const app = express();

// Create Student
app.get('/students-create', async(req, res) => {
    // TODO Real request will need a body with params
    // if(!req.body) {
    //     console.log(req.body);
    //     return res.status(400).send({message: "Body cannot be empty"});
    // }
    // const student = new Student(req.body);
    const student = new Student({name:"John Satan", email:"satan666@gmail.com", semester:"6"});
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
    if(!req.body) {
        console.log(req.body);
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
    const students = Student.find({});
    console.log("Students:" + students);
    try{
        res.send(students);
    }catch(err){ res.status(500).send(err); }
});

// TODO TEST
// Find Student
// let findUser = Student.findOne({email: "johndoee@gmail.com"}).then((result)=>{ console.log("Found:" + result); });
// Create Student
// let newStudent = new Student({name:"John Doe", email:"johndoe@gmail.com", semester:"6"});
// newStudent.save();
// TODO TEST

module.exports = app;
