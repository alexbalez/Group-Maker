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
}

export default new StudentDataConnector()
