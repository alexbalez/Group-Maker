import React, { Component } from 'react';
import './components.css';
import Navigation from './Navigation';
import StudentDataConnector from '../services/StudentDataConnector';


class Header extends Component {

    componentWillMount() {                
        this.setState({userdata: StudentDataConnector.getDashboard().then(result => result.data)})
        console.log(this.props)
    }

    render() {
        return (
            <div className="text-center bg-primary text-white mb-0 pb-0">
                <a href="/mock" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></a>
                <Navigation data={this.state.userdata} history={this.props.history}/>
            </div>
        );
    }


}

export default Header;