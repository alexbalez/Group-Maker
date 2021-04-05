import React, { Component } from 'react'
import '../../components.css'
import { Link } from "react-router-dom";
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Container} from 'react-bootstrap'
import axios from 'axios';

class AdminUpdateProgram extends Component {
    constructor(props){
        super(props)
        this.state = {
          programId: '',
          programName: '',
          programCode: '',
          campusId: '',
          campusName: '',
          campusProgramIds: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({
            programId: this.props.location.state.programId,
            programName: this.props.location.state.programName,
            programCode: this.props.location.state.programCode,
            campusId: this.props.location.state.campusId,
            campusName: this.props.location.state.campusName,
            campusProgramIds: this.props.location.state.campusProgramIds
        });
        console.log(this.state.programId);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        const { programName, programCode } = this.state;
        let tempId = JSON.stringify(this.state.programId);
        tempId = tempId.replaceAll("\"", "")

        axios.patch('/program/' + tempId, {"name": JSON.stringify(programName).replaceAll("\"", ""), "code": JSON.stringify(programCode).replaceAll("\"", "")})

        .then(function(response) {
            console.log(response);
            return response;
        }) 
        .then( this.props.history.push({
            pathname: "/admin-programs",
            state: {
                campusId: this.state.campusId,
                campusName: this.state.campusName,
                campusProgramIds: this.state.campusProgramIds
            }
        }))
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="d-flex justify-content-center">Update Program</h1>
                <h3>Program ID: {this.state.programId}</h3>
                <Link></Link>
                <Form onSubmit={this.handleSubmit}>
                    <label for="programName">Program Name</label>
                    <input 
                        type="text" 
                        name="programName" 
                        id="programName" 
                        value={this.state.programName} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.programName} 
                        required>
                    </input>
                    <label for="programCode">Program Code</label>
                    <input 
                        type="text" 
                        name="programCode" 
                        id="programCode" 
                        value={this.state.programCode} 
                        onChange={this.handleInputChange} 
                        placeholder={this.state.programCode} 
                        required>
                    </input>
                    <Button type="submit" variant="success">Update</Button>
                </Form>
            </div>
            
        )
    }
}


export default AdminUpdateProgram;