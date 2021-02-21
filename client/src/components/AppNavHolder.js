import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './components.css';
import Navigation from './Navigation'

class AppNavHolder extends Component {
   
    render() {
        console.log("Render AppNavHolder",this.props.history)
        return (
            <Navigation data={this.props.data} history={this.props.history} />
        );

    }
}

//must export like this in order for navigation to have access to props.history
export default withRouter(AppNavHolder);