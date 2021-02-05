//import axios from "axios"
//import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

import axios from "axios";

//useful to have this file so that we can change the api urls all in one place

const BASE_URL = "http://localhost:8081";

class EmployeeDataConnector {

    // getEmployees = () => {
    //     //return axios.get(EMP_URL+"/employees")
    //     console.log('attempting to get employee list')
    //     return axios.get(`${BASE_URL}/employees`)
    // };

    // addEmployee = (employee) => {
    //     //return axios.post(EMP_URL+"/employee", employee)
    //     return axios.post(`${BASE_URL}/employee`, employee)
    // };

    // deleteEmployee = (id) => {
    //     return axios.delete(`${BASE_URL}/employee/${id}`)
    // };

    // getEmployeeById = (id) => {
    //     //return axios.get(BASE_URL + "/" + id)
    //     return axios.get(`${BASE_URL}/employee/id`)
    // };

    // updateEmployeeById = (id, employee) => {
    //     return axios.put(BASE_URL + "/" + id, employee)
    // }

    getEmployees = () => {
        console.log('Attempting to get employee list')
        return axios.get(`${BASE_URL}/employees`)
    }

    addEmployee = (employee) => {
        console.log(employee)
        //return axios.post('https://jsonplaceholder.typicode.com/users', employee)
        return axios.post(`${BASE_URL}/employee`, employee)
    }

}

export default new EmployeeDataConnector()
