import React, { Component } from 'react';
import '../components.css';
import Navigation from '../Navigation'
import Header from '../Header'
import Footer from '../Footer'
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap';
import StudentDataConnector from '../../services/StudentDataConnector'

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        StudentDataConnector.getDashboard({})
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err.response)
                //kick user back to the login screen if the response status is 401 unauthorized
                if(err.response.status === 401) this.props.history.push('/')
            })
    }

    render() {
        return (
            <div>
                <Header/>
                <Navigation active="dashboard" history={this.props.history}/>

                {/* Search */}
                <Navbar className="bg-light justify-content-center">
                    <Form inline className="m-2">
                        <InputGroup>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    Filters
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Form>
                    <Form inline className="m-2">
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <Button variant="success" type="submit">Submit</Button>
                    </Form>
                    <Button className="m-2" variant="success">View Invites</Button>
                </Navbar>

                {/* New Groups */}
                <Table className="col-8 ml-auto mr-auto mt-3" striped bordered hover>
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
                <Table className="col-8 ml-auto mr-auto mt-3 mb-2" striped bordered hover>
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

                <Footer/>
            </div>
        );
    }


}

export default Dashboard;
