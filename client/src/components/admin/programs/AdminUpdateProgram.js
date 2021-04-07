import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminUpdateProgram extends Component {
    constructor(props){
        super(props)
        this.state = {
          programId: '',
          programName: '',
          programCode: '',
          programCourseIds: [],
          courses: [],
          courseId: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleRemoveCourse = this.handleRemoveCourse.bind(this);
    }

    async componentDidMount(){
        // await fetch('/campuses')
        // .then(res => res.json())
        // .then(campuses => this.setState({campuses}, () =>{
        //     console.log('Campuses fetched', this.state.campuses)
        // }))
        
        await this.setState({
            programId: this.props.location.state.programId,
            programName: this.props.location.state.programName,
            programCode: this.props.location.state.programCode,
            programCourseIds: this.props.location.state.programCourseIds,
            campusId: this.props.location.state.campusId,
            campusName: this.props.location.state.campusName,
            campusProgramIds: this.props.location.state.campusProgramIds
        })
        await fetch('/courses')
        .then(res => res.json())
        .then(courses => this.setState({courses}, () => {
            console.log('All Courses fetched', this.state.courses)
        }))
        console.log(this.state.programCourseIds)
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { programName, programCode } = this.state;
        let tempId = JSON.stringify(this.state.programId);
        tempId = tempId.replaceAll("\"", "")

        axios.patch('/program/' + tempId, {"name": JSON.stringify(programName).replaceAll("\"", ""), "code": JSON.stringify(programCode).replaceAll("\"", "")})

        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then( this.props.history.push({
            pathname: "/admin-programs",
            state: {
                campusId: this.state.campusId,
                campusName: this.state.campusName,
                campusProgramIds: this.state.campusProgramIds
            }
        }))
        event.preventDefault();
    }
    handleAddCourse(event){
        event.preventDefault();
        console.log(this.state.programId)
        console.log(this.state.courseId)
        axios.post('/program-add-course/' + this.state.programId + '/' + this.state.courseId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-programs',
                state: {
                    campusId: "All"
                }
            })
        )

    }

    handleRemoveCourse(event){
        event.preventDefault();
        console.log(this.state.programId)
        console.log(this.state.courseId)
        axios.post('/program-remove-course/' + this.state.programId + '/' + this.state.courseId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-programs',
                state: {
                    campusId: "All"
                }
            })
        )
    }
 
    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Update Program</h1>
                <h3>Program ID: {this.state.programId}</h3>
                <Link></Link>
                <Form onSubmit={this.handleSubmit}>
                    <label for="programName">Program Name</label>
                    <input 
                        type="text" 
                        name="programName" 
                        id="programName" 
                        value={this.state.programName} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.programName} 
                        required>
                    </input>
                    <label for="programCode">Program Code</label>
                    <input 
                        type="text" 
                        name="programCode" 
                        id="programCode" 
                        value={this.state.programCode} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.programCode} 
                        required>
                    </input>
                    <Button type="submit" variant="success">Update</Button>
                </Form>
                <hr></hr>
                <form onSubmit={this.handleAddCourse}>
                    <label for="courseId">Select Course to Add</label>
                    <select id="courseId" name="courseId" onChange={this.handleInputChange}>
                        {this.state.courses.map((course) => {
                            for(const programCourseId of this.state.programCourseIds) {
                                if(course.id == programCourseId){
                                    break
                                }
                                else{
                                    return <option value={course._id}>{course.name}</option>
                                }
                            }  
                        })}
                    </select>
                    <button type="submit">Add to Program</button>
                </form>
                <hr></hr>
                <form onSubmit={this.handleRemoveCourse}>
                    <label for="courseId">Select Course to Remove</label>
                    <select id="courseId" name="courseId" onChange={this.handleInputChange}>
                        {this.state.courses.map((course) => 
                            this.state.programCourseIds.map((courseId) => {
                                if(course._id == courseId){
                                    return <option value={course._id}>{course.name}</option> 
                                }
                            })  
                        )}
                    </select>
                    <button type="submit">Remove from Program</button>
                </form>
            </div>
            
        )
    }
}


export default AdminUpdateProgram; 