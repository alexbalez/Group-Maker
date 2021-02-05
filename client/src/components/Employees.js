import React, { Component } from 'react';
import './components.css';

class Employees extends Component {
    constructor(){
        super();
        this.state = {
            employees: []
        };
    }

    componentDidMount(){
        //this does not work without 'access-control-allow-origin placed in EmployeeRoutes on backend
        fetch('http://localhost:8081/employees') 
        //fetch('https://jsonplaceholder.typicode.com/users') //doesn't cause error
        .then(res => res.json())
        .then(employees => this.setState({employees}, () =>{
            console.log('Employees fetched', employees)
        }))
        .catch(rejected => console.log(rejected))
    }

    render(){
        return (
            <div>
                <h2>Employees List</h2>
                <ul className="unordered-list">
                    {this.state.employees.map(employee => 
                        <li key={employee._id}>{employee.firstname} {employee.lastname}</li>
                        //<li key={employee.id}>{employee.name} {employee.username}</li>
                    )}
                </ul>
            </div>
        );
    }


}

export default Employees;