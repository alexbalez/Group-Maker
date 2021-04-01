import React, { Component } from 'react'
import '../components.css'
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";

class AdminParamsSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
          
        }
        
    }

    componentDidMount(){

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
                        <td><Link className="btn btn-success btn-block" to="/admin-programs">All Programs</Link></td>
                        <td><Link className="btn btn-success btn-block" to="/admin-courses">All Courses</Link></td>
                        <td><Link className="btn btn-success btn-block" to="/admin-projects">AllProjects</Link></td>
                    </tr>
                </table>
            </div>
           
        )
    }
}


export default AdminParamsSearch;