import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminUpdateCourse extends Component {
    constructor(props){
        super(props)
        this.state = {
          courseId: '',
          courseName: '',
          courseCode: '',
          courseSemester: '',
          courseStartDate: '',
          courseEndDate: '',
          courseProjectIds: [],
          projects: [],
          projectId: '',
          programId: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);
        this.handleRemoveProject = this.handleRemoveProject.bind(this);
    }

    async componentDidMount(){
        // await fetch('/campuses')
        // .then(res => res.json())
        // .then(campuses => this.setState({campuses}, () =>{
        //     console.log('Campuses fetched', this.state.campuses)
        // }))
        
        await this.setState({
            courseId: this.props.location.state.courseId,
            courseName: this.props.location.state.courseName,
            courseCode: this.props.location.state.courseCode,
            courseSemester: this.props.location.state.courseSemester,
            courseStartDate: this.props.location.state.courseStartDate,
            courseEndDate: this.props.location.state.courseEndDate,
            courseProjectIds: this.props.location.state.courseProjectIds,
            programId: this.props.location.state.programId,
            programName: this.props.location.state.programName,
            programCode: this.props.location.state.programCode,
            programCourseIds: this.props.location.state.programCourseIds
            // campusId: this.props.location.state.campusId,
            // campusName: this.props.location.state.campusName,
            // campusProgramIds: this.props.location.state.campusProgramIds
        })
        await fetch('/projects')
        .then(res => res.json())
        .then(projects => this.setState({projects}, () => {
            console.log('All Projects fetched', this.state.projects)
        }))
        console.log(this.state.courseId)
        // console.log(this.state.course)
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { courseName, courseCode, courseSemester, courseStartDate, courseEndDate } = this.state;
        let tempId = JSON.stringify(this.state.courseId);
        tempId = tempId.replaceAll("\"", "")

        axios.patch('/course/' + tempId, {
            "name": JSON.stringify(courseName).replaceAll("\"", ""), 
            "code": JSON.stringify(courseCode).replaceAll("\"", ""), 
            "semester": JSON.stringify(courseSemester).replaceAll("\"",""),
            "startdate": JSON.stringify(courseStartDate).replaceAll("\"",""),
            "enddate": JSON.stringify(courseEndDate).replaceAll("\"",""),
        })
        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then( this.props.history.push({
            pathname: "/admin-courses",
            state: {
                programId: this.state.programId,
                programName: this.state.programName,
                programCode: this.state.programCode,
                programCourseIds: this.state.programCourseIds
            }
        }))
        event.preventDefault();
    }
    handleAddProject(event){
        event.preventDefault();
        console.log(this.state.courseId)
        console.log(this.state.projectId)
        axios.post('/course-add-project/' + this.state.courseId + '/' + this.state.projectId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-courses',
                state: {
                    programId: "All"
                }
            })
        )
    }

    handleRemoveProject(event){
        event.preventDefault();
        console.log(this.state.courseId)
        console.log(this.state.projectId)
        axios.post('/course-remove-project/' + this.state.courseId + '/' + this.state.projectId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-courses',
                state: {
                    programId: "All"
                }
            })
        )
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Update Course</h1>
                <h3>Course ID: {this.state.courseId}</h3>
                <Link></Link>
                <Form onSubmit={this.handleSubmit}>
                    <label for="courseName">Course Name</label>
                    <input 
                        type="text" 
                        name="courseName" 
                        id="courseName" 
                        value={this.state.courseName} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.courseName} 
                        required>
                    </input>
                    <label for="courseCode">Course Code</label>
                    <input 
                        type="text" 
                        name="courseCode" 
                        id="courseCode" 
                        value={this.state.courseCode} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.courseCode} 
                        required>
                    </input>
                    <label for="courseSemester" >Course Semester</label>
                    <input 
                        type="number" 
                        name="courseSemester" 
                        id="courseSemester" 
                        value={this.state.courseSemester} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.courseSemester}
                        required>
                    </input>
                    <label for="courseStartDate" >Course Start Date</label>
                    <input 
                        type="date" 
                        name="courseStartDate" 
                        id="courseStartDate" 
                        value={this.state.courseStartDate} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.courseStartDate}
                        required>
                    </input>
                    <label for="courseEndDate" >Course End Date</label>
                    <input 
                        type="date" 
                        name="courseEndDate" 
                        id="courseEndDate" 
                        value={this.state.courseEndDate} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.courseEndDate}
                        required>
                    </input>
                    <Button type="submit" variant="success">Update</Button>
                </Form>
                <hr></hr>
                <form onSubmit={this.handleAddProject}>
                    <label for="projectId">Select Project to Add</label>
                    <select id="projectId" name="projectId" onChange={this.handleInputChange}>
                        <option>Select Project</option>
                        {this.state.projects.map((project) => {
                            return <option value={project._id}>{project.name}</option>
                        })}
                    </select>
                    <button type="submit">Add to Course</button>
                </form>
                <hr></hr>
                <form onSubmit={this.handleRemoveProject}>
                    <label for="projectId">Select Project to Remove</label>
                    <select id="projectId" name="projectId" onChange={this.handleInputChange}>
                        <option>Select Project</option>
                        {this.state.projects.map((project) => 
                            this.state.courseProjectIds.map((projectId) => {
                                if(project._id == projectId){
                                    return <option value={project._id}>{project.name}</option> 
                                }
                            })  
                        )}
                    </select>
                    <button type="submit">Remove from Course</button>
                </form>
            </div>
            
        )
    }
}


export default AdminUpdateCourse;