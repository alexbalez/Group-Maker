import React, { Component } from 'react';
import './components.css';

class JoinPopUp extends Component{

    componentDidMount() {
    }

    render(){
        return (
            <div className='join-popup'>
                <div className='join-popup-inner p-4'>
                    <h1>{this.props.text}</h1>
                    <button className="btn btn-warning" onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

export default JoinPopUp;
