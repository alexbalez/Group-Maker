import React, { Component } from 'react'
import '../components.css'
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
                <Button>Edit Parameters</Button>
            </div>
           
        )
    }
}


export default AdminDashboard;