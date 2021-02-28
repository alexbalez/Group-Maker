import React, { Component } from 'react'
import '../components.css'
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
//import StudentDataConnector from '../../services/StudentDataConnector'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div>

                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        {/* Dropdown */}
                        <InputGroup  className="m-1">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="primary">
                                    Filters
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        <FormControl type="text" placeholder="Search your groups" className="m-1" />
                        <Button variant="success" type="submit" className="m-1">Search</Button>
                        <Button className="m-1" variant="primary">View Invites</Button>
                    </Form>
                    
                </Navbar>

                {/* New Groups */}
                <Table className="col-sm-8 mx-auto mt-4" striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="4">New Groups</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan="2">COMP 1230 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="2">COMP 1101 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="2">COMP 1333 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    </tbody>
                </Table>

                {/* Current Groups */}
                <Table className="col-sm-8 mx-auto mt-4 mb-2" striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="4">Current Groups</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan="2">COMP 1230 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="2">COMP 1101 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="2">COMP 1333 Study Group</td>
                        <td>Course Group</td>
                        <td><Button variant="warning">View</Button></td>
                    </tr>
                    </tbody>
                </Table>

                {/* Archived */}
                <Container className="col-8 mt-3">
                    <Button variant="warning">Archived Groups</Button>
                </Container>


            </div>
        );
    }


}

export default Dashboard;
