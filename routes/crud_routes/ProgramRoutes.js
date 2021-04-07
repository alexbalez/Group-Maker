const express = require("express");
const { Types, ObjectId } = require("mongoose");
const programModel = require("../../model/ProgramModel");
const courseModel = require("../../model/CourseModel");

const { requireAuth } = require("../../auth/authMiddleware");

const app = express();

// Create
app.post("/program", async (req, res) => {
  const program = new programModel(req.body);
  try {
    await program.save();
    res.send(program);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve
app.get("/programs", async (req, res) => {
  const program = await programModel.find({});
  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(program);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/program/:id", async (req, res) => {
  console.log(req.params.id);
  const program = await programModel.findById(req.params.id);
  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(program);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Retrieve multiple with array of IDs
app.get("/programs-by-id/:program_ids", async (req, res) => {
  var programIds = req.params.program_ids;
  programIds = JSON.parse(programIds);

  var programObjectIds = programIds.map((programId) => {
    return Types.ObjectId(programId);
  });
  console.log(programObjectIds);
  let programs = await programModel.find({ _id: { $in: programObjectIds } });
  try {
    console.log(programs);
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.send(programs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get Program info from its ID, and get a list of course objects that belong to it
app.get("/program-courses/:programId", requireAuth, async (req, res) => {
  try {
    const program = await programModel.findById(req.params.programId, {
      name: 1,
      code: 1,
      courses: 1,
    });
    console.log(program.courses);

    const courses = await courseModel.find(
      { _id: { $in: program.courses } },
      { code: 1, name: 1, semester: 1 }
    );

    res.json({ program, courses });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Update (use patch instead of put so you only have to send the data you want to change)
app.patch("/program/:id", async (req, res) => {
  try {
    await programModel.findByIdAndUpdate(req.params.id, req.body);
    await programModel.save();
    res.send({ result: "edit success" });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Delete
// localhost:8081/user/5d1f6c3e4b0b88fb1d257237
app.delete("/program/:id", async (req, res) => {
  try {
    const program = await programModel.findByIdAndDelete(req.params.id);
    if (!program) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/program-add-course/:programId/:courseId", async (req, res) => {
  const tempProgramId = req.params.programId;
  const tempCourseId = req.params.courseId;
  try {
    const program = await programModel.findByIdAndUpdate(
      { _id: tempProgramId },
      { $addToSet: { courses: tempCourseId } },
      { new: true, useFindAndModify: false }
    );

    if (!program) res.status(404).send("No Program found!");
    await program.save();
    res.end();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/program-remove-course/:programId/:courseId", async (req, res) => {
  const tempProgramId = req.params.programId;
  const tempCourseId = req.params.courseId;
  try {
    const program = await programModel.findByIdAndUpdate(
      { _id: tempProgramId },
      { $pull: { courses: tempCourseId } },
      { new: true, useFindAndModify: false }
    );

    await program.save();
    res.end();
  } catch {
    res.status(500).send(err);
  }
});

module.exports = app;
