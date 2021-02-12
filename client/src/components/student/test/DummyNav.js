import React, {Component}from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { withRouter } from 'react-router'

class Navigation extends Component {
    
    constructor(props){
        super(props)
        this.location = props.location
        this.state = {
            data: { email: "Loading..."}
        }
    }

    //https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change
    // todo: UNSAFE_ suppresses deprication warning. Handle later
    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log(nextProps.data)
        this.setState({ data: nextProps.data });
    }

    render() {
        //console.log(this.state.data.email, '.....new data');
        return (
            <Navbar style={{ marginTop: "-8px", width: "100%" }} bg="dark" variant="dark" expand="sm" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={this.location.pathname} className="mr-auto">
                        <Nav.Link  href="/dummies/dummy1">Dummy1</Nav.Link>
                        <Nav.Link  href="/dummies/dummy2">Dummy2</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        
                        <NavDropdown title={this.state.data.email} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom
export default withRouter(Navigation);