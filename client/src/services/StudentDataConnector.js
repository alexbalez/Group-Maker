import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudent = () =>{
        
    }

    getPreferenceByType = (type) => {
        return Axios.get('/preferences/'+type)
    }
}

export default new StudentDataConnector()
