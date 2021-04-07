import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Navbar, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminAddCampus extends Component {
    constructor(props){
        super(props)
        this.state = {
          campusName: '',
          campusAddress: ''
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
        const { campusName, campusAddress } = this.state;
        // let tempId = JSON.stringify(this.state.campusId);
        // tempId = tempId.replaceAll("\"", "")

        axios.post('/campus/', {"name": JSON.stringify(campusName).replaceAll("\"", ""), "address": JSON.stringify(campusAddress).replaceAll("\"", "")})

        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then(this.props.history.push('/admin-campuses'))
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Add New Campus</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="campusName">Campus Name</label>
                    <input 
                        type="text" 
                        name="campusName" 
                        id="campusName" 
                        value={this.state.campusName} 
                        onChange={this.handleInputChange} 
                        placeholder="Campus Name..."
                        required>
                    </input>
                    <label for="campus_address" >Campus Address</label>
                    <input 
                        type="text" 
                        name="campusAddress" 
                        id="campusAddress" 
                        value={this.state.campusAddress} 
                        onChange={this.handleInputChange} 
                        placeholder="Campus Address..."
                        required>
                    </input>
                    <Button type="submit" variant="success">Add</Button>
                </form>
            </div>
           
        )
    }
}


export default AdminAddCampus;