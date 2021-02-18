import React, { Component } from 'react';
import './components.css';

class JoinPopUp extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className='join-popup'>
                <div className='join-popup-inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

export default JoinPopUp;
