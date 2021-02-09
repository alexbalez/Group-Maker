import React, { Component } from 'react';
import './components.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

class Navigation extends Component {
    // constructor(props){
    //     super(props);
            //Store information here that is specific to each user
    // }

    componentDidMount() {
        //todo: pull in information here specific to each user
    }

    render() {
        return (
            <Navbar style={{ marginTop: "-10px", width: "100%" }} bg="dark" variant="dark" expand="sm" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">My Groups</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/find">Find</Nav.Link>
                        <Nav.Link href="/auto">Auto</Nav.Link>
                        <Nav.Link href="/help">Help</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            //     <Navbar.Collapse id="responsive-navbar-nav">
            //         <Nav className="mr-auto">
            //             <Nav.Link href="#features">Features</Nav.Link>
            //             <Nav.Link href="#pricing">Pricing</Nav.Link>
            //             <Nav.Link href="#deets">More details</Nav.Link>
            //             <Nav.Link eventKey={2} href="#memes">
            //                 Good stuff
            //             </Nav.Link>
            //         </Nav>
            //         <Nav className="ml-auto">
            //             <Nav.Link href="#deets">More details</Nav.Link>
            //         </Nav>
            //     </Navbar.Collapse>
            // </Navbar>
        );
    }


}

export default Navigation;