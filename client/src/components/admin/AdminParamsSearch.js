import React, { Component } from 'react'
import '../components.css'
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";

class AdminParamsSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
          
        }
        this.handleAllPrograms = this.handleAllPrograms.bind(this);
        this.handleAllCourses = this.handleAllCourses.bind(this);
        this.handleAllProjects = this.handleAllProjects.bind(this);
    }

    componentDidMount(){

    }

    handleAllPrograms(){
        this.props.history.push({
            pathname: "/admin-programs",
            state: {
                campusId: "All"
            }
        })
    }

    handleAllCourses(){
        this.props.history.push({
            pathname: "/admin-courses",
            state: {
                programId: "All"
            }
        })
    }

    handleAllProjects(){
        this.props.history.push({
            pathname: "/admin-projects",
            state: {
                courseId: "All"
            }
        })
    }

    render() {
        return(
            <div>
                <h1>Administrator Parameter Search</h1>
                <table>
                    <tr>
                        <th>Search Campus</th>
                        <th>Search Program</th>
                        <th>Search Course</th>
                        <th>Search Project</th>
                    </tr>
                    <tr>
                        <td><FormControl type="text" placeholder="Campus Code..." className="m-1" onChange={this.handleCampusSearchChange}/></td>
                        <td><FormControl type="text" placeholder="Program Code..." className="m-1" onChange={this.handleProgramSearchChange}/></td>
                        <td><FormControl type="text" placeholder="Course Code..." className="m-1" onChange={this.handleCourseSearchChange}/></td>
                        <td><FormControl type="text" placeholder="Project Code..." className="m-1" onChange={this.handleProjectSearchChange}/></td>
                    </tr>
                    <tr>
                        <td><Link className="btn btn-success btn-block" to="/admin-campuses">All Campuses</Link></td>
                        <td><Button className="btn btn-success btn-block" onClick={this.handleAllPrograms}>All Programs</Button></td>
                        <td><Button className="btn btn-success btn-block" onClick={this.handleAllCourses}>All Courses</Button></td>
                        <td><Button className="btn btn-success btn-block" onClick={this.handleAllProjects}>All Projects</Button></td>
                    </tr>
                </table>
            </div>
           
        )
    }
}


export default AdminParamsSearch;