import React, { Component } from 'react';
import './components.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import profilePhoto from '../img/avatar-placeholder.gif'

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'user'
        }

    }

    componentDidMount() {
        //todo: pull in information here specific to each user
        this.setState({username: 'Joeseph Username'})
    }

    render() {
        return (
            <Navbar style={{ marginTop: "-8px", width: "100%" }} bg="dark" variant="dark" expand="sm" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link active={this.props.active==="dashboard"} href="/dashboard">My Groups</Nav.Link>
                        <Nav.Link active={this.props.active === "create"} href="/create">Create</Nav.Link>
                        <Nav.Link active={this.props.active === "find"} href="/find">Find</Nav.Link>
                        <Nav.Link active={this.props.active === "auto"} href="/auto">Auto</Nav.Link>
                        <Nav.Link active={this.props.active === "help"} href="/help">Help</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                    <img src={profilePhoto} alt="Profile" width="50" height="50"/>
                        <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }


}

export default Navigation;