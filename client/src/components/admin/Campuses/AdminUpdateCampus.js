import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminUpdateCampus extends Component {
    constructor(props){
        super(props)
        // const campusId = (this.props.location.state.campusId)
        this.state = {
          campusId: '',
          campusName: '',
          campusAddress: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
            this.setState({
                campusId : this.props.location.state.campusId,
                campusName: this.props.location.state.campusName,
                campusAddress: this.props.location.state.campusAddress
            });
            console.log(this.state.campusId)
        
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { campusName, campusAddress } = this.state;
        let tempId = JSON.stringify(this.state.campusId);
        tempId = tempId.replaceAll("\"", "")

        axios.patch('/campus/' + tempId, {"name": JSON.stringify(campusName).replaceAll("\"", ""), "address": JSON.stringify(campusAddress).replaceAll("\"", "")})

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
                <h1 className="d-flex justify-content-center">Update Campus</h1>
                <h3>Campus ID: {this.state.campusId}</h3>
                <Link></Link>
                <Form onSubmit={this.handleSubmit}>
                    <label for="campusName">Campus Name</label>
                    <input 
                        type="text" 
                        name="campusName" 
                        id="campusName" 
                        value={this.state.campusName} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.campusName} 
                        required>
                    </input>
                    <label for="campus_address" >Campus Address</label>
                    <input 
                        type="text" 
                        name="campusAddress" 
                        id="campusAddress" 
                        value={this.state.campusAddress} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.campusAddress} 
                        required>
                    </input>
                    <Button type="submit" variant="success">Update</Button>
                </Form>
            </div>
           
        )
    }
}


export default AdminUpdateCampus;