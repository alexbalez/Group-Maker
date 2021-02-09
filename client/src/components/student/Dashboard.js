import React, { Component } from 'react';
import '../components.css';
import Navigation from '../Navigation'
import Header from '../Header'


class Dashboard extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Header/>
                <Navigation/>
            </div>
        );
    }


}

export default Dashboard;
