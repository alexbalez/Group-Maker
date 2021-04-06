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
          campusAddress: '',
          campusProgramIds: [],
          programs: [],
          programId: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddProgram = this.handleAddProgram.bind(this);
        this.handleRemoveProgram = this.handleRemoveProgram.bind(this);
    }

    componentDidMount(){
        this.setState({
            campusId : this.props.location.state.campusId,
            campusName: this.props.location.state.campusName,
            campusAddress: this.props.location.state.campusAddress,
            campusProgramIds: this.props.location.state.campusProgramIds
        });
        console.log(this.state.campusId)
        fetch('/programs')
        .then(res => res.json())
        .then(programs => this.setState({programs}, () => {
            console.log('All Programs fetched', this.state.programs)
        }))
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

    handleAddProgram(event){
        event.preventDefault();
        console.log(this.state.campusId)
        console.log(this.state.programId)
        axios.post('/campus-add-program/' + this.state.campusId + '/' + this.state.programId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-campuses',
                states: {
    
                }
            })
        )
        
    }

    handleRemoveProgram(event){
        event.preventDefault();
        console.log(this.state.campusId)
        console.log(this.state.programId)
        axios.post('/campus-remove-program/' + this.state.campusId + '/' + this.state.programId)
        .then(function(response){
            console.log(response)
            return response
        })
        .then(
            this.props.history.push({
                pathname: '/admin-campuses',
                states: {
    
                }
            })
        )
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
                <hr></hr>
                <form onSubmit={this.handleAddProgram}>
                    <label for="programId">Select Program to Add</label>
                    <select id="programId" name="programId" onChange={this.handleInputChange}>
                        {this.state.programs.map((program) => {
                            for(const campusProgramId of this.state.campusProgramIds) {
                                if(program.id == campusProgramId){
                                    break
                                }
                                else{
                                    return <option value={program._id}>{program.name}</option>
                                }
                            }  
                        })}
                    </select>
                    <button type="submit">Add to Campus</button>
                </form>
                <hr></hr>
                <form onSubmit={this.handleRemoveProgram}>
                    <label for="programId">Select Program to Remove</label>
                    <select id="programId" name="programId" onChange={this.handleInputChange}>
                        {this.state.programs.map((program) => 
                            this.state.campusProgramIds.map((programId) => {
                                if(program._id == programId){
                                    return <option value={program._id}>{program.name}</option> 
                                }
                            })  
                        )}
                    </select>
                    <button type="submit">Remove from Campus</button>
                </form>

            </div>
           
        )
    }
}


export default AdminUpdateCampus;