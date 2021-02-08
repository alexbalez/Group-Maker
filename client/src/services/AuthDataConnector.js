import Axios from 'axios'
class AuthDataConnector {
    getAuth = (credentials) =>{
        const params = new URLSearchParams();
        params.append('email', credentials.email);
        params.append('password', credentials.password);
        const config = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return Axios.post('/login', params, config)
    };


    addUser = (user) =>{
      return Axios.post('/signup', user)
    }
}

export default new AuthDataConnector()
