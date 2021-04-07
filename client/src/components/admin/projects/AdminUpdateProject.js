import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminUpdateProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectId: '',
            projectName: '',
            projectAssignedDate: '',
            projectDueDate: '',
            projectWeight: '',
            projectMinGroupSize: '',
            projectMaxGroupSize: '',
            courses: [],
            courseId: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        // await fetch('/campuses')
        // .then(res => res.json())
        // .then(campuses => this.setState({campuses}, () =>{
        //     console.log('Campuses fetched', this.state.campuses)
        // }))
        
        await this.setState({
            projectId: this.props.location.state.projectId,
            projectName: this.props.location.state.projectName,
            projectAssignedDate: this.props.location.state.projectAssignedDate,
            projectDueDate: this.props.location.state.projectDueDate,
            projectWeight: this.props.location.state.projectWeight,
            projectMinGroupSize: this.props.location.state.projectMinGroupSize,
            projectMaxGroupSize: this.props.location.state.projectMaxGroupSize,
            courseId: this.props.location.state.courseId,
            courseName: this.props.location.state.courseName,
            courseCode: this.props.location.state.courseCode,
            courseProjectIds: this.props.location.state.courseProjectIds
            // campusId: this.props.location.state.campusId,
            // campusName: this.props.location.state.campusName,
            // campusProgramIds: this.props.location.state.campusProgramIds
        })
        // await fetch('/projects')
        // .then(res => res.json())
        // .then(projects => this.setState({projects}, () => {
        //     console.log('All Projects fetched', this.state.projects)
        // }))
        // console.log(this.state.courseId)
        // console.log(this.state.course)
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { projectName, projectAssignedDate, projectDueDate, projectWeight, projectMinGroupSize, projectMaxGroupSize } = this.state;
        let tempId = JSON.stringify(this.state.projectId);
        tempId = tempId.replaceAll("\"", "")

        axios.patch('/project/' + tempId, {
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
        .then( this.props.history.push({
            pathname: "/admin-projects",
            state: {
                courseId: this.state.courseId,
                courseName: this.state.courseName,
                courseCode: this.state.courseCode,
                courseProjectIds: this.state.courseProjectIds
            }
        }))
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Update Project</h1>
                <h3>Project ID: {this.state.projectId}</h3>
                <Link></Link>
                <Form onSubmit={this.handleSubmit}>
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
                    <Button type="submit" variant="success">Update</Button>
                </Form>
                <hr></hr>
            </div>
        )
    }
}


export default AdminUpdateProject;