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

    try {
        console.log("--backend", req.body)
        student1 = await studentModel.findById(req.params.id);
        student2 = req.body;

        if(student1.campuses[0] !== student2.campuses[0]){
            //remove the student id from the old campus and add it to the new campus
        }

        if(student1.programs[0] !== student2.programs[0]){
            //remove the student id from the old program and add it to the new program
        }

        let removedCourses = student1.courses.filter(item => !student2.courses.includes(item));
        let addedCourses = student2.courses.filter(item => !student1.courses.includes(item));

        if(removedCourses.length > 0 || addedCourses.length > 0){
            //list of removed courses
            //list of added courses
            console.log('removed: ', removedCourses, 'added: ', addedCourses);

        }

        // update the student with findbyIdAndUpdate()
        // get the campus
        // get the program
        // get the courses

        // remove student id if neccessary
        // add student id if necessary
        // if a change happened, remove student id from the old list, add it to the new list


        

        //get the list of preference IDs from user before update
        // const orig_user = await userModel.findOne({ _id: req.params.id }, { _id: 0, preferences: 1 })

        // const updated_user = await userModel.findByIdAndUpdate(
        //     req.params.id, req.body,
        //     { new: true, useFindAndModify: false }
        // )

        // let removed_prefs = orig_user.preferences.filter(i => !updated_user.preferences.includes(i));

        // //add user id to all appropriate preferences if it's not there already
        // const prefAddStatus = await preferenceModel.updateMany(
        //     { '_id': { $in: updated_user.preferences } },
        //     { $addToSet: { users: req.params.id } }
        // )

        // //remove user ids from prefs if any were removed in the update
        // const prefRemoveStatus = await preferenceModel.updateMany(
        //     { '_id': { $in: removed_prefs } },
        //     { $pull: { users: req.params.id } }
        // )

        // //res.json({student_res: updated_user, pref_res: prefAddStatus, pref_remove_res: prefRemoveStatus})
        // res.json(updated_user)
        res.end()
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});




module.exports = app