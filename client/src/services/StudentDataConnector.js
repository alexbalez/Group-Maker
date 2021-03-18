import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudent = () =>{
        
    }
}

export default new StudentDataConnector()
