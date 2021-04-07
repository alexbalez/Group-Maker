import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminAddProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            courses:[],
            courseId: '',
            courseName: '',
            coursede: '',
            projectName: '',
            projectAssignedDate: '',
            projectDueDate: '',
            projectWeight: '',
            projectMinGroupSize: '',
            projectMaxGroupSize: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('/courses')
        .then(res => res.json())
        .then(courses => this.setState({courses}, () =>{
            console.log('Courses fetched', this.state.courses)
        }))
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { projectName, projectAssignedDate, projectDueDate, projectWeight, projectMinGroupSize, projectMaxGroupSize } = this.state;
        // let tempId = JSON.stringify(this.state.campusId);
        // tempId = tempId.replaceAll("\"", "")

        axios.post('/project/', {
            "name": JSON.stringify(projectName).replaceAll("\"", ""), 
            "assigneddate": JSON.stringify(projectAssignedDate).replaceAll("\"", ""), 
            "duedate": JSON.stringify(projectDueDate).replaceAll("\"",""),
            "weight": JSON.stringify(projectWeight).replaceAll("\"",""),
            "mingroupsize": JSON.stringify(projectMinGroupSize).replaceAll("\"",""),
            "maxgroupsize": JSON.stringify(projectMaxGroupSize).replaceAll("\"","")
        })

        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then(this.props.history.push({
            pathname: '/admin-projects',
            state: {
               courseId: 'All'
            }
    
        }))
        event.preventDefault();
    }
 
    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Add New Course</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="projectName">Project Name</label>
                    <input 
                        type="text" 
                        name="projectName" 
                        id="projectName" 
                        value={this.state.projectName} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectName} 
                        required>
                    </input>
                    <label for="projectAssignedDate">Date Assigned</label>
                    <input 
                        type="date" 
                        name="projectAssignedDate" 
                        id="projectAssignedDate" 
                        value={this.state.projectAssignedDate} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectAssignedDate} 
                        required>
                    </input>
                    <label for="projectDueDate" >Date Due</label>
                    <input 
                        type="date" 
                        name="projectDueDate" 
                        id="projectDueDate" 
                        value={this.state.projectDueDate} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectDueDate}
                        required>
                    </input>
                    <label for="projectWeight" >Weight</label>
                    <input 
                        type="number" 
                        name="projectWeight" 
                        id="projectWeight" 
                        value={this.state.projectWeight} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectWeight}
                        required>
                    </input>
                    <label for="projectMinGroupSize" >Min Group Size</label>
                    <input 
                        type="number" 
                        name="projectMinGroupSize" 
                        id="projectMinGroupSize" 
                        value={this.state.projectMinGroupSize} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectMinGroupSize}
                        required>
                    </input>
                    <label for="projectMaxGroupSize" >Max Group Size</label>
                    <input 
                        type="number" 
                        name="projectMaxGroupSize" 
                        id="projectMaxGroupSize" 
                        value={this.state.projectMaxGroupSize} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.projectMaxGroupSize}
                        required>
                    </input>
                    <Button type="submit" variant="success">Add</Button>
                </form>
            </div>
        )
    }
}


export default AdminAddProject;