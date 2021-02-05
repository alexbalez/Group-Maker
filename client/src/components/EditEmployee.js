import React, { Component } from "react"
import EmployeeDataConnector from "../backend-connect/employeeDataConnector";

class EditEmployee extends Component{
    constructor(props){
        super(props);

        this.state= {
            _id: props.match.params.id,
            firstname: "",
            lastname: "",
            emailId: ""
        };

        this.firstNameChanged = (e) =>{
            this.setState({firstname: e.target.value});
        };

        this.lastNameChanged = (e) =>{
            this.setState({lastname: e.target.value});
        };

        this.emailChanged = (e) =>{
            this.setState({emailId: e.target.value});
        };

        this.submitForm = (e) =>{
            e.preventDefault();
            let employee = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                emailId: this.state.emailId
            };

            EmployeeDataConnector.updateEmployeeById(this.state.id, employee)
                .then(res =>{
                    this.props.history.push("/")
                })
                .catch(e => console.error(e))
        };

        this.cancel = () =>{
            this.props.history.push("/");
            //this.props.history.goBack()
        }
    }

    componentDidMount() {
        EmployeeDataConnector.getEmployeeById(this.state.id)
            .then(res => {
                this.setState({
                    firstName: res.data.firstname,
                    lastName: res.data.lastname,
                    emailId: res.data.emailId
                })
            })
            .catch(e => console.error(e))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Edit Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                           value={this.state.firstname} onChange={this.firstNameChanged}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                           value={this.state.lastname} onChange={this.lastNameChanged}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input placeholder="Email" name="emailId" className="form-control"
                                           value={this.state.emailId} onChange={this.emailChanged}
                                    />
                                </div>

                                <div className="text-center mt-4">
                                    <button className="btn btn-success m-2 btn-block" onClick={this.submitForm}>Save</button>
                                    <button className="btn btn-danger m-2 btn-block" onClick={this.cancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEmployee
