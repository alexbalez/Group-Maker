import Axios from 'axios'
class StudentDataConnector {

    getDashboard = () => {
        return Axios.get('/dashboard')
    };

    updateStudentAbout = (userId, user) =>{
        return Axios.patch(`/update-user-student-about-me/${userId}`, user)
    };

    getPreferences = () => {
        return Axios.get('/preferences')
    };

    // getAdditionalData = (collegeId) => {
    //     return Axios.get(`/additional-data/${collegeId}`)
    // }

    getCampusesFromCollege = (collegeId) =>{
        return Axios.get(`/college-campuses/${collegeId}`)
    };

    getProgramsFromCampus = (campusId) =>{
        return Axios.get(`/campus-programs/${campusId}`)
    };

    getCoursesFromProgram = (programId) => {
        return Axios.get(`/course-programs/${programId}`)
    };


}

export default new StudentDataConnector();
