import Axios from 'axios'

class AuthDataConnector {
    getAuth = (credentials) =>{
        return Axios.get('/login', credentials)
    };

    addUser = (user) =>{
      return Axios.post('/')
    }
}

export default new AuthDataConnector()
