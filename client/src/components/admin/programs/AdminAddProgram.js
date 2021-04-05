import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminAddProgram extends Component {
    constructor(props){
        super(props)
        this.state = {
          campusName: '',
          campusAddress: '',
          programName: '',
          programCode: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { programName, programCode } = this.state;
        // let tempId = JSON.stringify(this.state.campusId);
        // tempId = tempId.replaceAll("\"", "")

        axios.post('/program/', {"name": JSON.stringify(programName).replaceAll("\"", ""), "code": JSON.stringify(programCode).replaceAll("\"", "")})

        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then(this.props.history.push('/admin-programs'))
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Add New Program</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="programName">Program Name</label>
                    <input 
                        type="text" 
                        name="programName" 
                        id="programName" 
                        value={this.state.programName} 
                        onChange={this.handleInputChange} 
                        placeholder="Program Name..."
                        required>
                    </input>
                    <label for="programCode" >Campus Address</label>
                    <input 
                        type="text" 
                        name="programCode" 
                        id="programCode" 
                        value={this.state.programCode} 
                        onChange={this.handleInputChange} 
                        placeholder="Program Code..."
                        required>
                    </input>
                    <Button type="submit" variant="success">Add</Button>
                </form>
            </div>
           
        )
    }
}


export default AdminAddProgram;