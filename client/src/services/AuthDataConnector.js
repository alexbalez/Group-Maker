import Axios from 'axios'
//const BASE_URL = 'http://localhost:5000';
const BASE_URL = '';
class AuthDataConnector {
    getAuth = (credentials) =>{

        const params = new URLSearchParams();
        params.append('email', credentials.email);
        params.append('password', credentials.password);

        const config = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };

        return Axios.post(BASE_URL+'/login', params, config)
    };


    addUser = (user) =>{
      return Axios.post(BASE_URL+'/signup', user)
    }
}

export default new AuthDataConnector()
