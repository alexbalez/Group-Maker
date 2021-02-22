const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoute = require('./routes/studentRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const userRouter = require('./routes/crud_routes/UserRoutes.js');
const roleRouter = require('./routes/crud_routes/RoleRoutes.js');
const groupRouter = require('./routes/crud_routes/GroupRoutes.js');
const collegeRouter = require('./routes/crud_routes/CollegeRoutes.js');
const campusRouter = require('./routes/crud_routes/CampusRoutes.js');
const programRouter = require('./routes/crud_routes/ProgramRoutes.js');
const courseRouter = require('./routes/crud_routes/CourseRoutes.js');
const projectRouter = require('./routes/crud_routes/ProjectRoutes.js');
const ratingRouter = require('./routes/crud_routes/RatingRoutes.js');
const preferenceRouter = require('./routes/crud_routes/PreferenceRoutes.js');

const userRoleRouter = require('./routes/entity_relationship_routes/UserRoleRoutes.js');
const userGroupRouter = require('./routes/entity_relationship_routes/UserGroupRoutes.js');
const userPreferenceRouter = require('./routes/entity_relationship_routes/UserPreferenceRoutes.js');
const userRatingRouter = require('./routes/entity_relationship_routes/UserRatingRoutes.js');
const userCollegeRouter = require('./routes/entity_relationship_routes/UserCollegeRoutes.js');
const userCampusRouter = require('./routes/entity_relationship_routes/UserCampusRoutes.js');
const userProgramRouter = require('./routes/entity_relationship_routes/UserProgramRoutes.js');
const userCourseRouter = require('./routes/entity_relationship_routes/UserCourseRoutes.js');
const userProjectRouter = require('./routes/entity_relationship_routes/UserProjectRoutes.js');
const groupCollegeRouter = require('./routes/entity_relationship_routes/GroupCollegeRoutes.js');
const groupCampusRouter = require('./routes/entity_relationship_routes/GroupCampusRoutes.js');
const groupProgramRouter = require('./routes/entity_relationship_routes/GroupProgramRoutes.js');
const groupCourseRouter = require('./routes/entity_relationship_routes/GroupCourseRoutes.js');
const groupProjectRouter = require('./routes/entity_relationship_routes/GroupProjectRoutes.js');


const app = express();
const port = 5000;

// Config Log
console.log(result.parsed);

// cookies middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(studentRoute);
app.use(authRoute); //authRoute exports express.Router()
app.use(userRoute);
app.use(userRouter);
app.use(roleRouter);
app.use(groupRouter);
app.use(collegeRouter);
app.use(campusRouter);
app.use(programRouter);
app.use(courseRouter);
app.use(projectRouter);
app.use(ratingRouter);
app.use(preferenceRouter);

app.use(userRoleRouter);
app.use(userGroupRouter);
app.use(userPreferenceRouter);
app.use(userRatingRouter);
app.use(userCollegeRouter);
app.use(userCampusRouter);
app.use(userProgramRouter);
app.use(userCourseRouter);
app.use(userProjectRouter);
app.use(groupCollegeRouter);
app.use(groupCampusRouter);
app.use(groupProgramRouter);
app.use(groupCourseRouter);
app.use(groupProjectRouter);

// MongoDB Connection
//const DB_URL = "mongodb+srv://thiago:mypassword@cluster0.siwfc.mongodb.net/group-maker?retryWrites=true&w=majority";
// const DB_URL = "mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/gbc_fullstack?retryWrites=true&w=majority";
const DB_URL = "mongodb+srv://KevinUfkes:harpoonharpoon12345!@cluster0.gmis5.mongodb.net/groupMakerDatabaseBranch?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server")
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// Server
const server = app.listen(port, () => console.log(`Server running on port ${port}`));




/////////// testing cookies ///////////////////

app.get('/set-cookies', (req, res) => {

    // sets cookie called newUser with value of true
    //access programmatically with document.cookie
    //res.setHeader('Set-Cookie', 'newUser=true');

    // using cookie middlware:

    res.cookie('newUser', false); //sets a cookie called new user with value true
    
    //set cookie to keep user logged in for one day (max age in ms)
    //httpOnly: true means that cookie is not accessible in js console. only through http
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    
    //set cookie for use with only https (secure: true)
    //res.cookie('isEmployee', true, { maxAge: 1000 * 3600 * 24, secure: true });

    res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

    // once cookies are set, as long as the cookies are alive, every request has those cookies attached
    const cookies = req.cookies;
    

    res.json(cookies);

});
