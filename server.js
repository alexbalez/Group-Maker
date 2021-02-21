const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoute = require('./routes/studentRoute');
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





const app = express();
const port = 5000;

// Config Log
console.log(result.parsed);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(studentRoute);
app.use(authRoute); //authRoute exports express.Router()
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



// MongoDB Connection
//const DB_URL = "mongodb+srv://thiago:mypassword@cluster0.siwfc.mongodb.net/group-maker?retryWrites=true&w=majority";
// const DB_URL = "mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/gbc_fullstack?retryWrites=true&w=majority";
const DB_URL = "mongodb+srv://KevinUfkes:harpoonharpoon12345!@cluster0.gmis5.mongodb.net/groupMakerDatabaseBranch?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Server
// const server = app.listen(port, () => console.log(`Server running on port ${port}`));
app.listen(port, () => console.log(`Server running on port ${port}`));

