import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudent = (userId, user) =>{
        return Axios.patch(`/user/${userId}`, user)
    }

    getPreferences = () => {
        return Axios.get('/preferences')
    }

    getAdditionalData = (collegeId) => {
        return Axios.get(`/additional-data/${collegeId}`)
    }
}

export default new StudentDataConnector()
