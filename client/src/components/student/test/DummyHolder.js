import React, { Component } from 'react';
//import { Navbar, Nav } from 'react-bootstrap';
import Dummy1 from './Dummy1';
import Dummy2 from './Dummy2';
import DummyNav from './DummyNav';
import { Route } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        
    }

    componentDidMount() {
        this.setState({username: "Peter Parker"})
    }

    render() {
        return (
            <div>
                <DummyNav username={this.state.username}/>
                <Route path="/dummies/dummy1" component={Dummy1}/>
                <Route path="/dummies/dummy2" component={Dummy2}/>
            </div>
        );
    }


}

export default Navigation;