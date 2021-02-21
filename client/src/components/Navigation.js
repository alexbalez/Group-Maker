import React, { Component } from 'react';
import './components.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import profilePhoto from '../img/avatar-placeholder.gif'
import AuthDataConnector from '../services/AuthDataConnector'

class Navigation extends Component {
    constructor(props){
        super(props);
        this.location = props.location
        this.state = {            
            data: this.props.data,
            username: 'user' //replace email with this? User object from db doesn't include a username 
        }

        this.logout = () =>{
            
            //sends request to db to destroy the cookie
            AuthDataConnector.logoutUser()
                .then((res) =>{
                    console.log('Logout successful') 
                    //must pass the history from parent component
                    //https://stackoverflow.com/questions/43837212/this-props-history-push-works-in-some-components-and-not-others
                    this.props.history.push('/')
                    window.location.reload() //reload page so navbar disappears
                })
                .catch((err)=>{
                    console.log('Could not logout', err)
                })
        }
    }

    render() {
        return (
            <Navbar style={{ marginTop: "-8px", width: "100%" }} bg="dark" variant="dark" expand="sm" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link active={this.props.active === "dashboard"} href="/dashboard">My Groups</Nav.Link>
                        <Nav.Link active={this.props.active === "create"} href="/create">Create</Nav.Link>
                        <Nav.Link active={this.props.active === "find"} href="/find">Find</Nav.Link>
                        <Nav.Link active={this.props.active === "auto"} href="/auto">Auto</Nav.Link>
                        <Nav.Link active={this.props.active === "help"} href="/help">Help</Nav.Link>
                    </Nav>
                    
                    <Nav className="ml-auto">
                        <NavDropdown title={this.state.data.email} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={ this.logout }>Logout</NavDropdown.Item>
                        </NavDropdown>
                        <img src={profilePhoto} alt="Profile" width="50" height="50"/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }


}

export default Navigation;