const express = require('express');
const campusModel = require('../../model/CampusModel');
const programModel = require('../../model/ProgramModel');
const courseModel = require('../../model/CourseModel');
const studentModel = require('../../model/UserModel');

const { requireAuth } = require('../../auth/authMiddleware');

const app = express();

app.patch('/update-user-student-about-college/:id', requireAuth, async (req, res) => {

    //only allow a user to update their own information
    if (req.params.id !== req.userid) {
      res.status(401).json({ error: "Not authorized" });
    }

    //TODO: this should be in a transaction so that if any of them fail, the rest can be rolled back
    try {
        //console.log("--update college info", req.body)
        const student1 = await studentModel.findById(req.params.id);
        const student2 = req.body;
        let campusResults={}, programResults={}, courseResults={}, updatedUser={};
    
        //if there was a change to the campus id
        if(student1.campuses[0] !== student2.campuses[0]){
            console.log('update triggered')
            //remove the student id from the old campus
            campusResults.remove = await campusModel.updateOne(
                { _id: student1.campuses[0] }, 
                { $pull: { users: req.params.id } }
            );
            //add student id to the new campus
            campusResults.add = await campusModel.updateOne(
                { _id: student2.campuses[0] }, 
                { $addToSet: { users:  req.params.id } }
            );
        }

        //if there was a change to the program id
        if(student1.programs[0] !== student2.programs[0]){
            //remove the student id from the old program
            programResults.remove = await programModel.updateOne(
                { _id: student1.programs[0] },
                { $pull: { users: req.params.id } }
            );
            //add student id to the new program
            programResults.add = await programModel.updateOne(
                { _id: student2.programs[0] },
                { $addToSet: { users: req.params.id } }
            );
        }

        //track the changes to courses
        let removedCourses = student1.courses.filter(item => !student2.courses.includes(item));
        let addedCourses = student2.courses.filter(item => !student1.courses.includes(item));

        //if there was a change in courses
        if(removedCourses.length > 0 || addedCourses.length > 0){
            console.log('removed: ', removedCourses, 'added: ', addedCourses);
            courseResults.remove = await courseModel.updateMany(
                { '_id': { $in: removedCourses } },
                { $pull: { users: req.params.id } }
            );
            courseResults.add = await courseModel.updateMany(
                { '_id': { $in: addedCourses } },
                { $addToSet: { users: req.params.id } }
            );
        }

        updatedUser = await studentModel.findByIdAndUpdate(req.params.id, student2, { useFindAndModify: false});

        res.json({campusResults, programResults, courseResults, updatedUser});
        res.end();
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});




module.exports = app