import Axios from 'axios'
class StudentDataConnector {

    getDashboard = () => {
        return Axios.get('/dashboard')
    };

    updateStudentAbout = (userId, user) =>{
        return Axios.patch(`/update-user-student-about-me/${userId}`, user)
    };

    updateStudentCollegeInfo = (userId, data) => {
        return Axios.patch(`/update-user-student-about-college/${userId}`, data)
    };
    

    getPreferences = () => {
        return Axios.get('/preferences')
    };

    getCampusesFromCollege = (collegeId) =>{
        return Axios.get(`/college-campuses/${collegeId}`)
    };

    getProgramsFromCampus = (campusId) =>{
        return Axios.get(`/campus-programs/${campusId}`)
    };

    getCoursesFromProgram = (programId) => {
        return Axios.get(`/program-courses/${programId}`)
    };

    //returns a list of all campuses, and a list of programs that belong to a given campus
    getCampusesAndPrograms(campusId){
        return Axios.get(`/campuses-programs/${campusId}`)
    };

    //returns a list of all campuses, a list of all programs that belong to a given campus, and 
    // a list of all courses that belong to a given program
    getCampusesProgramsAndCourses(campusId, programId){
        return Axios.get(`/campuses-programs-courses/${campusId}/${programId}`)
    };

}

export default new StudentDataConnector();
