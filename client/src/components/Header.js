import React, { Component } from 'react';
import './components.css';
import Navigation from './Navigation';
import StudentDataConnector from '../services/StudentDataConnector';


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            // userdata: {email: ''},
            loggedIn: false
        }
    }

    componentDidMount() {
        StudentDataConnector.getDashboard()
            .then(result => {
                this.setState({ userdata: result.data, loggedIn: true })
            })
            .catch(err => {
                this.setState({ userdata: { loggedIn: false} }) //user is not logged in
            })
    }

    render() {
        console.log('HeaderRender', this.props.history)

        if (this.state.loggedIn){
            return (
                <div className="text-center bg-primary text-white mb-0 pb-0">
                    <a href="/mock" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></a>
                    <Navigation data={this.state.userdata} history={this.props.history} />
                </div>
            );
        }
        else{
            return (
                <div className="text-center bg-primary text-white mb-0 pb-0">
                    <a href="/mock" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></a>
                    
                </div>
            );
        }
    }


}

export default Header;