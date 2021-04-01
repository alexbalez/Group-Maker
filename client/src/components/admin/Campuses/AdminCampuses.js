import React, { Component } from 'react'
import '../../components.css'
import { Link, withRouter } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, TableRow, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminCampuses extends Component {
    constructor(props){
        super(props)
        this.state = {
          campuses: []
        }
        this.handleUpdateCampus = this.handleUpdateCampus.bind(this);
        this.addCampus = this.addCampus.bind(this);
    }

    componentDidMount(){
        fetch('/campuses')
        .then(res => res.json())
        .then(campuses => this.setState({campuses}, () =>{
            console.log('Campuses fetched', this.state.campuses)
        }))
    }

    handleUpdateCampus(event){
        const campus = JSON.parse(event.target.value)

        this.props.history.push({
            pathname: "/admin-update-campus",
            state: {
                campusId: campus._id,
                campusName: campus.name,
                campusAddress: campus.address
            }
        })
    }

    addCampus(event){

    }
   
    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Campuses</h1>
                <Link className="btn btn-primary btn-block" to="/admin-dashboard">Back to Dashboard</Link>
                <Table className="table">
                    <thead>
                        <tr>
                            <th>Campus ID</th>
                            <th>Campus Name</th>
                            <th>Campus Address</th>
                            <th>View</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.campuses.map((campus) =>
                            <tr>
                                <td>{campus._id}</td>
                                <td>{campus.name}</td>
                                <td>{campus.address}</td>
                                <td><Button variant="success">View Programs</Button></td>
                                <td><Button variant="warning" value={JSON.stringify(campus)} onClick={this.handleUpdateCampus}>Update Campus</Button></td>
                                <td><Button variant="danger">Delete Campus</Button></td>
                            </tr>   
                        )}
                    </tbody>
                </Table>

                <Link className="btn btn-success btn-block" to="/admin-add-campus">Add Campus</Link>


            </div>
           
        )
    }
}


export default AdminCampuses;