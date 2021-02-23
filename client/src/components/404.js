import './components.css';
import React, { Component } from "react";
import {Link} from 'react-router-dom'

class FourOhFour extends Component{

    render(){
        return (
            <div>
                <div style={{ height: "300px" }} className="m-5">
                    <h1>404 Not Found</h1>
                    <p>The Page you requested does not exist</p>
                    <Link to="/dashboard">Back to Dashboard</Link>
                </div>

            </div>
        )
    }
}

export default FourOhFour