import React, { Component } from "react"
import EmployeeDataConnector from "../backend-connect/employeeDataConnector";

export default class ViewEmployee extends Component{
    constructor(props){
        super(props);

        this.state= {
            id: props.match.params.id,
            firstName: "",
            lastName: "",
            emailId: ""
        };

        this.launchEdit = () =>{
            this.props.history.push("/edit/"+this.state.id)
        };

        this.launchDelete = () =>{
            EmployeeDataConnector.deleteEmployee(this.state.id)
                .then( res =>{
                    this.props.history.push("/")
                })
                .catch(e => console.error(e))
        }
    }

    componentDidMount() {
        EmployeeDataConnector.getEmployeeById(this.state.id)
            .then(res =>{
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    emailId: res.data.emailId
                })
            })
            .catch(e => console.error(e))
    }

    render() {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark text-center">
                    <tr>
                        <th colSpan="2">Employee #{this.state.id} Information</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.emailId}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <a className="btn btn-primary mr-1" href={"/"}>Back</a>
                    <button className="btn btn-warning mr-1" onClick={this.launchEdit}>Edit</button>
                    <button className="btn btn-danger mr-1" onClick={this.launchDelete}>Delete</button>
                </div>
            </div>
        )
    }
}
