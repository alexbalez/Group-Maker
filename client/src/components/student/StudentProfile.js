import React, { Component } from 'react'
import '../components.css'
import { Button, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
//import StudentDataConnector from '../../services/StudentDataConnector'

class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }

    submit = (e)=>{
        e.preventDefault()
        console.log('submit')

    }

    handleDropdownSelect(e){
        console.log(e)
    }

    render() {
        return (
            <div>
                <div className="col-6 mx-auto mt-4">
                <Form>
                        <h1 className="text-center text-capitalize">{this.state.data.username}</h1>
                        <h4>Affiliation</h4>
                        <div className="form-group col-md-6">
                            <select className="btn btn-secondary dropdown-toggle w-100-percent mt-1" name="campus" onChange={this.handleChange}>
                                {/* TODO: pull these options from db */}
                                <option value>Select Campus</option>
                                <option value="Casa Loma">Casa Loma</option>
                                <option value="St James">St James</option>
                                <option value="Waterfront">Waterfront</option>
                            </select>
                            <select className="btn btn-secondary dropdown-toggle w-100-percent mt-1" name="school" onChange={this.handleChange}>
                                <option value>Select School</option>
                                <option value="Design and Tech">Design and Tech</option>
                                <option value="Construction engineering">Construction Engineering</option>
                                <option value="Culinary">Culinary</option>
                            </select>
                        </div>

                        <h4>Course List</h4>
                        <h4>About Me</h4>
                        <h4>Phone</h4>
                        <h4>Interests</h4>
                        <h4>Skills</h4>





                        <input type="text" onChange={this.handleChange} />
                
                </Form>
                    
                    


                    {/*<p><strong>ID:</strong> {this.state.data._id}</p>*/}
                    {/* <p><strong>Username:</strong> {this.state.data.username}</p>
                    <p><strong>Email:</strong> {this.state.data.email}</p>
                    <h1>My Data</h1>
                    <p><strong>Colleges:</strong> {this.state.data.colleges}</p>
                    <p><strong>Campuses:</strong> {this.state.data.campuses}</p> */}
                </div>
            </div>
        );
    }


}

export default StudentProfile;
