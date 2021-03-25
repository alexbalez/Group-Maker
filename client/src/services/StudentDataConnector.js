import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudentAbout = (userId, user) =>{
        return Axios.patch(`/update-user-student-about-me/${userId}`, user)
    }

    getPreferences = () => {
        return Axios.get('/preferences')
    }

    getAdditionalData = (collegeId) => {
        return Axios.get(`/additional-data/${collegeId}`)
    }
}

export default new StudentDataConnector()
