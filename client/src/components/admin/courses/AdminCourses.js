import React, { Component } from 'react'
import '../../components.css'
import { Link, withRouter } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminCourses extends Component {
    constructor(props){
        super(props)
        this.state = {
          programCourseIds: [],
          programId: "",
          programName: "", 
          program: [],
          courses: [],
          title: "Courses"
        }
        this.handleUpdateCourse = this.handleUpdateCourse.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleViewProjects = this.handleViewProjects.bind(this);
        
    }

    async componentDidMount(){

        // Load All Courses if no Campus Selected
        await this.setState({
            programId: this.props.location.state.programId
        })
        if(this.state.programId == "All"){
            fetch('/courses')
            .then(res => res.json())
            .then(courses => this.setState({courses}, () => {
                console.log('All Courses fetched', this.state.courses)
            }))
            this.setState({title: "All Courses"})
        
        // Load Courses for specific Program if selecting "View Courses" from AdminPrograms.js
        } else {
            await this.setState({
                programName: this.props.location.state.programName,
                programCourseIds: this.props.location.state.programCourseIds
            })
            fetch('/courses-by-id/' + JSON.stringify(this.state.programCourseIds))
            .then(res => res.json())
            .then(courses => this.setState({courses}, () =>{
                console.log(`Courses in  ${this.state.programName}  fetched`, this.state.courses)
            }))
            this.setState({title: `Courses in ${this.state.programName}`})
        } 
    }

    handleUpdateCourse(event){
        const course = JSON.parse(event.target.value)

        this.props.history.push({
            pathname: "/admin-update-course",
            state: {
                courseId: course._id,
                courseName: course.name,
                courseCode: course.code,
                courseSemester: course.Semester,
                courseStartDate: course.startdate,
                courseEndDate: course.enddate,
                programId: this.state.programId,
                programName: this.state.programName,
                programCourseIds: this.state.programCourseIds
            }
        })
    }

    handleAddCourse(){
        this.props.history.push({
            pathname: "/admin-add-course",
            state: {
                programId: this.state.programId,
                programName: this.state.programName
            }
        })
    }

    handleViewProjects(event){
        const course = JSON.parse(event.target.value);
        this.props.history.push({
            pathname: "/admin-projects",
            state: {
                courseId: course._id,
                courseName: course.name,
                courseProjectIds: course.projects
            }
        })
    }
   
    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">{this.state.title}</h1>
                <Link className="btn btn-primary btn-block" to="/admin-dashboard">Back to Dashboard</Link>
                <Table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Course Code</th>
                            <th>Semester</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>View</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.courses.map((course) =>
                            <tr>
                                <td>{course._id}</td>
                                <td>{course.name}</td>
                                <td>{course.code}</td>
                                <td>{course.semester}</td>
                                <td>{course.startdate}</td>
                                <td>{course.enddate}</td>
                                <td><Button variant="success" value={JSON.stringify(course)} onClick={this.handleViewProjects}>View Projects</Button></td>
                                <td><Button variant="warning" value={JSON.stringify(course)} onClick={this.handleUpdateCourse}>Update Course</Button></td>
                                <td><Button variant="danger">Delete Course</Button></td>
                            </tr>   
                        )}
                    </tbody>
                </Table>
                

                <Button className="btn btn-success btn-block" onClick={this.handleAddCourse}>Add Course</Button>
            </div>
        )
    }
}

export default AdminCourses;