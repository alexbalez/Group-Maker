import React, { Component } from "react";
import EmployeeDataConnector from "../backend-connect/employeeDataConnector";
import Confirm from "./utils/Confirm"

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            showModal: false,
            employeeToDelete: null
        };

        this.addEmployee = () => {
            this.props.history.push("/add") //change url
        };

        this.editEmployee = (id) => {
            this.props.history.push("/edit/" + id) //change url
        };

        this.askToDeleteEmployee = (employee) => {
            //insert modal here
            this.setState({ showModal: true, employeeToDelete: employee })
        };

        this.deleteEmployee = (id) => {

            EmployeeDataConnector.deleteEmployee(id)
                .then(res => {
                    this.setState({
                        //update component employee list
                        employees: this.state.employees.filter(emp => emp.id !== id)
                    })
                })
                .catch(e => console.error(e))
        };

        this.viewEmployee = (id) => {
            this.props.history.push("/view/" + id) //change url
        }

    }

    componentDidMount() {
        EmployeeDataConnector.getEmployees()
            //.then(res => res.json())
            .then(employees => this.setState({ employees:employees.data }, () => {
                console.log('Employees fetched', employees)
            }))
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.employees.length > 0) {
            return (
                <div>
                    <Confirm
                        show={this.state.showModal}
                        onHide={() => {
                            this.setState({ showModal: false })
                        }}
                        delete={() => {
                            this.setState({ showModal: false });
                            this.deleteEmployee(this.state.employeeToDelete.id)
                        }}
                        id={(this.state.employeeToDelete !== null) ? this.state.employeeToDelete.firstName : ''}

                    />

                    <h2 className="text-center">Employees List </h2>
                    <div className="row pb-3 mr-1 flex-row-reverse">
                        <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                    </div>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark text-center">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map((employee) => (
                                    
                                    <tr key={employee._id}>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee._id}</td>
                                        <td className="text-center">
                                            <button className="btn btn-primary ml-1" onClick={() => this.editEmployee(employee.id)}>
                                                Edit
                                        </button>
                                            <button className="btn btn-danger ml-1" onClick={() => this.askToDeleteEmployee(employee)}>
                                                Delete
                                        </button>
                                            <button className="btn btn-success ml-1" onClick={() => this.viewEmployee(employee.id)}>
                                                View
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className="text-center">

                <h1>Employees List </h1>
                <div className="row pb-3 mr-1 flex-row-reverse">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <h3>No Employees in Database</h3>
            </div>
        )
    }
}

export default EmployeeList
