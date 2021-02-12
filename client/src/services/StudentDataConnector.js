import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }
}

export default new StudentDataConnector()
