const express = require('express');
const campusModel = require('../../model/CampusModel');
const programModel = require('../../model/ProgramModel');
const courseModel = require('../../model/CourseModel');

const { requireAuth } = require('../../auth/authMiddleware');

const app = express();

// Get list of all campuses and list of programs from given campus ID
app.get('/campuses-programs/:campusId', requireAuth, async (req, res) => {

    try {
        const campus = await campusModel.findById(req.params.campusId, { name: 1, address: 1, programs: 1 });
        const campuses = await campusModel.find({}, {name:1, address:1, programs:1});
        console.log(campus.programs)

        const programs = await programModel.find(
            { '_id': { $in: campus.programs } },
            { code: 1, name: 1 }
        )

        res.json({ campus, programs, campuses });

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

// Get list of call campuses, list of all programs that belong to a given campus
// and a list of all courses that belong to a given program
app.get('/campuses-programs-courses/:campusId/:programId', requireAuth, async (req, res) => {

    try {
        const campus = await campusModel.findById(req.params.campusId, { name: 1, address: 1, programs: 1 });
        const campuses = await campusModel.find({}, { name: 1, address: 1, programs: 1 });
        
        const program = await programModel.findById(req.params.programId, { name: 1, code: 1, courses: 1 });
        const programs = await programModel.find(
            { '_id': { $in: campus.programs } },
            { code: 1, name: 1 }
        );

        const courses = await courseModel.find(
            { '_id': { $in: program.courses } },
            { code: 1, name: 1, semester: 1 }
        )

        res.json({ campus, campuses, program, programs, courses });

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});



module.exports = app