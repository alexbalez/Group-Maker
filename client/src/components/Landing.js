import React, { Component } from 'react';
import './components.css';
import Mock from './Mock';


class Landing extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                <h2>Welcome to Group Maker</h2>
                <Mock/>
            </div>
        );
    }


}

export default Landing;
