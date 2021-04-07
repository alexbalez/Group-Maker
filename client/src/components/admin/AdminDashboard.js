import React, { Component } from 'react'
import '../components.css'
import { Link } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'

class AdminDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
          
        }
        
    }

    componentDidMount(){

    }

    render() {
        return(
            <div>
                <h1>Administrator Dashboard</h1>
                <Link className="btn btn-primary btn-block" to="/admin-params-search" >Edit Parameters</Link>
            </div>
           
        )
    }
}


export default AdminDashboard;