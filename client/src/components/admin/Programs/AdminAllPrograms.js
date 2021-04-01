import React, { Component } from 'react'
import '../../components.css'
import { Link, withRouter } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminAllPrograms extends Component {
    constructor(props){
        super(props)
        this.state = {
          programs: [],
          campus: []
        }
        this.handleUpdateProgram = this.handleUpdateProgram.bind(this);
    }

    componentDidMount(){
        fetch('/programs')
        .then(res => res.json())
        .then(programs => this.setState({programs}, () =>{
            console.log('Programs fetched', this.state.programs)
        }))
    }

    handleUpdateProgram(event){
        const program = JSON.parse(event.target.value)

        this.props.history.push({
            pathname: "/admin-update-program",
            state: {
                programId: program._id,
                programName: program.name,
                programCode: program.code
            }
        })
    }
   
    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">All Programs</h1>
                <Link className="btn btn-primary btn-block" to="/admin-dashboard">Back to Dashboard</Link>
                <Table className="table">
                    <thead>
                        <tr>
                            <th>Program ID</th>
                            <th>Program Name</th>
                            <th>Program Code</th>
                            <th>View</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.programs.map((program) =>
                            <tr>
                                <td>{program._id}</td>
                                <td>{program.name}</td>
                                <td>{program.code}</td>
                                <td><Button variant="success">View Courses</Button></td>
                                <td><Button variant="warning" value={JSON.stringify(program)} onClick={this.handleUpdateProgram}>Update Program</Button></td>
                                <td><Button variant="danger">Delete Program</Button></td>
                            </tr>   
                        )}
                    </tbody>
                </Table>

                <Link className="btn btn-success btn-block" to="/admin-add-campus">Add Program</Link>
            </div>
        )
    }
}


export default AdminAllPrograms;