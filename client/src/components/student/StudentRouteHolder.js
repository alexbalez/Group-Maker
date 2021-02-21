import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import StudentDataConnector from '../../services/StudentDataConnector'
import Header from '../Header'
import Dashboard from './Dashboard';
import Navigation from '../Navigation'

////////////// This component is just for testing purposes ////////////////////

class StudentRouteHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { message: "Loading...." }
        }
    }

    componentWillMount() {
        this.setState({ userdata: StudentDataConnector.getDashboard().then(result => result.data) })
        console.log(this.props)
    }

    componentDidMount() {
        StudentDataConnector.getDashboard({})
            .then(res => {
                this.setState({ data: res.data })
                //console.log('Data fetched from api', res.data)
            })
            .catch(err => {
                if (err.response.status === 401) this.props.history.push('/')
            })
    }

    render() {
        return (
            <div>
                <div className="text-center bg-primary text-white mb-0 pb-0">
                    <a href="/dashboard" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></a>
                </div>
                <Navigation data={this.state.data}/>
                <Route path="/student/dashboard" component={ Dashboard } />
            </div>
        );
    }


}

export default StudentRouteHolder;