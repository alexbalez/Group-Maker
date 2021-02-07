import Axios from 'axios'

class AuthDataConnector {
    getAuth = (credentials) =>{
        return Axios.get('/login', credentials)
    }
}

export default new AuthDataConnector()
