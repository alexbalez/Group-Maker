import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = (user) => {
        return Axios.get('/dashboard', user)
    }
}

export default new StudentDataConnector()
