import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminAddCourse extends Component {
    constructor(props){
        super(props)
        this.state = {
            programs:[],
            programId: '',
            programName: '',
            programCOde: '',
            courseName: '',
            courseCode: '',
            courseSemester: '',
            courseStartDate: '',
            courseEndDate: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('/programs')
        .then(res => res.json())
        .then(programs => this.setState({programs}, () =>{
            console.log('Programs fetched', this.state.programs)
        }))
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { courseName, courseCode, courseSemester, courseStartDate, courseEndDate } = this.state;
        // let tempId = JSON.stringify(this.state.campusId);
        // tempId = tempId.replaceAll("\"", "")

        axios.post('/course/', {
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
        .then(this.props.history.push({
            pathname: '/admin-courses',
            state: {
                programId: 'All'
            }
    
        }))
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Add New Course</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="courseName">Course Name</label>
                    <input 
                        type="text" 
                        name="courseName" 
                        id="courseName" 
                        value={this.state.courseName} 
                        onChange={this.handleInputChange} 
                        placeholder="CourseName..."
                        required>
                    </input>
                    <label for="courseCode" >Course Code</label>
                    <input 
                        type="text" 
                        name="courseCode" 
                        id="courseCode" 
                        value={this.state.courseCode} 
                        onChange={this.handleInputChange} 
                        placeholder="Course Code..."
                        required>
                    </input>
                    <label for="courseSemester" >Course Semester</label>
                    <input 
                        type="number" 
                        name="courseSemester" 
                        id="courseSemester" 
                        value={this.state.courseSemester} 
                        onChange={this.handleInputChange} 
                        placeholder='1'
                        required>
                    </input>
                    <label for="courseStartDate" >Course Start Date</label>
                    <input 
                        type="date" 
                        name="courseStartDate" 
                        id="courseStartDate" 
                        value={this.state.courseStartDate} 
                        onChange={this.handleInputChange} 
                        required>
                    </input>
                    <label for="courseEndDate" >Course End Date</label>
                    <input 
                        type="date" 
                        name="courseEndDate" 
                        id="courseEndDate" 
                        value={this.state.courseEndDate} 
                        onChange={this.handleInputChange} 
                        required>
                    </input>
                    <Button type="submit" variant="success">Add</Button>
                </form>
            </div>
           
        )
    }
}


export default AdminAddCourse;