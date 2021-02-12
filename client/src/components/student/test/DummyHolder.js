import React, { Component } from 'react';
//import { Navbar, Nav } from 'react-bootstrap';
import Dummy1 from './Dummy1';
import Dummy2 from './Dummy2';
import DummyNav from './DummyNav';
import { Route } from 'react-router-dom'
import StudentDataConnector from '../../../services/StudentDataConnector'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { message: "Loading..."}
        }
    }

    componentDidMount() {
        StudentDataConnector.getDashboard({})
            .then(res =>{
                this.setState({ data: res.data})
                //console.log('Data fetched from api', res.data)
            })
            .catch(err =>{
                if (err.response.status === 401) this.props.history.push('/')
            })
    }

    render() {
        return (
            <div>
                {/* Wrap everything in React.Fragment to avoid having too many DOM nodes (speeds things up) */}
                <React.Fragment>
                    <DummyNav data={this.state.data} />
                    <Route path="/dummies/dummy1" component={Dummy1} />
                    <Route path="/dummies/dummy2" component={Dummy2} />
                </React.Fragment>
            </div>
        );
    }


}

export default Navigation;