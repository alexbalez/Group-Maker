import React, { Component } from 'react'
import '../../components.css'
import { Link, withRouter } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminProjects extends Component {
    constructor(props){
        super(props)
        this.state = {
          courseProjectIds: [],
          courseId: "",
          courseName: "",  
          project: [],
          projects: [],
          title: "Projects"
        }
        this.handleUpdateProject = this.handleUpdateProject.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);
        
    }

    async componentDidMount(){

        // Load All Courses if no Campus Selected
        await this.setState({
            courseId: this.props.location.state.courseId
        })
        if(this.state.courseId == "All"){
            fetch('/projects')
            .then(res => res.json())
            .then(projects => this.setState({projects}, () => {
                console.log('All Projects fetched', this.state.projects)
            }))
            this.setState({title: "All Projects"})
        
        // Load Courses for specific Program if selecting "View Courses" from AdminPrograms.js
        } else {
            await this.setState({
                courseName: this.props.location.state.courseName,
                courseProjectIds: this.props.location.state.courseProjectIds
            })
            fetch('/projects-by-id/' + JSON.stringify(this.state.courseProjectIds))
            .then(res => res.json())
            .then(projects => this.setState({projects}, () =>{
                console.log(`Projects in  ${this.state.courseName}  fetched`, this.state.projects)
            }))
            this.setState({title: `Projects in ${this.state.courseName}`})
        } 
    }

    handleUpdateProject(event){
        const project = JSON.parse(event.target.value)

        this.props.history.push({
            pathname: "/admin-update-project",
            state: {
                projectId: project._id,
                projectName: project.name,
                projectAssignedDate: project.assigneddate,
                projectDueDate: project.duedate,
                projectWeight: project.weight,
                projectMinGroupSize: project.mingroupsize,
                projectMaxGroupSize: project.maxgroupsize,
                courseId: this.state.courseId,
                courseName: this.state.courseName,
                courseProjectIds: this.state.courseProjectIds
            }
        })
    }

    handleAddProject(){
        this.props.history.push({
            pathname: "/admin-add-project",
            state: {
                courseId: this.state.courseId,
                courseName: this.state.courseName
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
                            <th>Project ID</th>
                            <th>Project Name</th>
                            <th>Project Assigned Date</th>
                            <th>Project Due Date</th>
                            <th>Project Weight</th>
                            <th>Project Min Group Size</th>
                            <th>Project Max Group Size</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project) =>
                            <tr>
                                <td>{project._id}</td>
                                <td>{project.name}</td>
                                <td>{project.assigneddate}</td>
                                <td>{project.duedate}</td>
                                <td>{project.weight}</td>
                                <td>{project.mingroupsize}</td>
                                <td>{project.maxgroupsize}</td>
                                <td><Button variant="warning" value={JSON.stringify(project)} onClick={this.handleUpdateProject}>Update Project</Button></td>
                                <td><Button variant="danger">Delete Project</Button></td>
                            </tr>   
                        )}
                    </tbody>
                </Table>
                
                <Button className="btn btn-success btn-block" onClick={this.handleAddProject}>Add Project</Button>
            </div>
        )
    }
}

export default AdminProjects;