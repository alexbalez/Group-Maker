import Axios from 'axios'
class StudentDataConnector {
    
    getDashboard = () => {
        return Axios.get('/dashboard')
    }

    updateStudent = () =>{
        
    }

    getInterests = () => {
        const result = Axios.get('/preferences')
        result
            .then((data) => console.log(data))
            .catch(err => console.log(err))
    }
}

export default new StudentDataConnector()
