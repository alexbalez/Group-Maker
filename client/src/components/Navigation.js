import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './components.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import profilePhoto from '../img/avatar-placeholder.gif'
import AuthDataConnector from '../services/AuthDataConnector'

class Navigation extends Component {
    constructor(props){
        super(props);
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

        this.goToProfile = () =>{
            this.props.history.push('/profile')
        }
    }

    render() {
        return (
            <Navbar style={{ marginTop: "-8px", width: "100%" }} bg="dark" variant="dark" expand="sm" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <NavLink className="nav-link" activeClassName="active" to="/dashboard">Dashboard</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/create">Create</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/find">Find</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/auto">Auto</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/help">Help</NavLink>
                    </Nav>
                    
                    <Nav className="ml-auto">
                        <NavDropdown className="bg-dark" title={this.state.data.username} id="nav-dropdown">
                            <NavDropdown.Item onClick={ this.goToProfile }>My Profile</NavDropdown.Item>
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