const express = require("express");
const groupModel = require("../../model/GroupModel");

const collegeModel = require("../../model/CollegeModel");
const campusModel = require("../../model/CampusModel");
const programModel = require("../../model/ProgramModel");
const courseModel = require("../../model/CourseModel");
const projectModel = require("../../model/ProjectModel");
const preferenceModel = require("../../model/PreferenceModel");
const app = express();

// Create
app.post("/group", async (req, res) => {
  const newGroup = new groupModel(req.body);
  try {
    const group = await newGroup.save();
    console.log("Group Created: " + group._id);
    res.send(group);
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
  }
});

// Retrieve
app.get("/groups", async (req, res) => {
  const groups = await groupModel.find({});
  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Search groups containing :name (no case)
app.post("/groups/s/name/", async (req, res) => {
  const group = await groupModel
    .find(
      {
        name: { $regex: req.body.name, $options: "i" },
      },
      "id name description"
    )
    .exec((err, search) => {
      if (err) res.status(500).send(err);
      res.send(search);
    });
});

app.get("/group/:id", async (req, res) => {
  console.log(req.params.id);
  const group = await groupModel.findById(req.params.id);
  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch("/group/:id", async (req, res) => {
  try {
    await groupModel.findByIdAndUpdate(req.params.id, req.body);
    await groupModel.save();
    res.send({ result: "edit success" });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete("/group/:id", async (req, res) => {
  try {
    const group = await groupModel.findByIdAndDelete(req.params.id);
    if (!group) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/group-info/:id", async (req, res) => {
  if (req.params.id === "undefined" || req.params.id === undefined) {
    console.log("/group-info/:id -> PARAM undefined");
    return;
  }
  let prefs = false;
  console.log("/group-info/:id -> PARAM worked");
  const group = await groupModel.findById(req.params.id);
  console.log(group);
  //check if they exist!
  if (group.college) {
    const college = await collegeModel.findById(group.college);
    group.college = college.name;
  }
  if (group.campus) {
    const campus = await campusModel.findById(group.campus);
    group.campus = campus.name;
  }
  if (group.program) {
    const program = await programModel.findById(group.program);
    group.program = program.name;
  }
  if (group.course) {
    const course = await courseModel.findById(group.course);
    group.course = course.code;
  }
  if (group.project) {
    const project = await projectModel.findById(group.project);
    group.project = project.name;
  }
  if (group.preferences[0]) {
    const preference1 = await preferenceModel.findById(group.preferences[0]);
    group.preferences[0] = preference1.description + " ";
    prefs = true;
  }
  if (group.preferences[1]) {
    const preference2 = await preferenceModel.findById(group.preferences[1]);
    group.preferences[1] = preference2.description;
    prefs = true;
  }
  if (!prefs) {
    group.preferences[0] = "None";
  }

  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
