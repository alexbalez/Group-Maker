import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudent = () =>{
        
    }

    getPreferences = () => {
        return Axios.get('/preferences')
    }
}

export default new StudentDataConnector()
