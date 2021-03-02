import React, { Component } from 'react'
import '../components.css'
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Navbar} from 'react-bootstrap';
import JoinPopUp from '../JoinPopUp';

class FindGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false
        }
    }


    handleJoin = (e) => {
        e.preventDefault();
        this.setState({popup: !this.state.popup});
    }

    render() {
        return (
            <div>

                {/* Join PopUp - Fires when user clicks on "Join" */}
                {this.state.popup ? <JoinPopUp text="Testing popup" closePopup={this.handleJoin}/> : null}

                {/* Search Bar */}
                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        <InputGroup className="m-1">
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
                    
                        <FormControl type="text" placeholder="Search suggested" className="m-1" />
                        <Button variant="success" type="submit" className="m-1">Search</Button>
                        <Button className="m-1" variant="danger">Reset</Button>
                    
                    </Form>
                </Navbar>

                {/* Groups Table */}
                <div className="col-sm-8 mx-auto mt-4 mb-5"> 
                    <h4 className="d-flex justify-content-center">Suggested Groups</h4>
                    <Table className="mx-auto mt-3" striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan="2">Group Name</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan="2">T127 Study Group</td>
                            <td>Course Group</td>
                            <td><Button onClick={this.handleJoin} variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 1101 Assignment 1</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 1101 Assignment 1</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">T127 Study Group</td>
                            <td>Course Group</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 1101 Assignment 1</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 1101 Assignment 1</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 2201 Assignment 2</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        <tr>
                            <td colSpan="2">COMP 2201 Assignment 1</td>
                            <td>Assignment</td>
                            <td><Button variant="success">Join</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }


}

export default FindGroup;
