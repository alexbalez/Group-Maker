import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './components.css';

class AppHeader extends Component {
    render() {
        return (
            <div className="text-center bg-primary text-white mb-0 pb-0">
                <Link to="/dashboard" className="text-decoration-none text-white"><h1 className="p-2">Group Maker</h1></Link>
            </div>
        );
       
    }
}

export default AppHeader;