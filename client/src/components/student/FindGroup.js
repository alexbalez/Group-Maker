import React, { Component } from 'react'
import '../components.css'
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Navbar} from 'react-bootstrap';
import JoinPopUp from '../JoinPopUp';
import axios from 'axios'


class FindGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false,
            id: '',
            search: '',
            results: []
        }
    }

    handleSearch = (e) => {
        e.preventDefault()
        axios.post('/groups/s/name', {
            name: this.state.search
        }).then((res) => {
            this.setState({results: res.data})
        }, (err) => {
            console.log("err",err)
        })
    }

    handleSearchChange = (e) => {
        e.preventDefault()
        this.setState({search: e.target.value})
        console.log(this.state.search)
    }

    handleJoin = (e) => {
        e.preventDefault();
        this.setState({id: e.target.value})
        this.setState({popup: !this.state.popup});
    }

    handleSearchResults = (result, index) => {
        console.log(result)
        return(
            <tr key={index}>
                <td colSpan="2">{result.name}</td>
                <td>{result.description}</td>
                <td><Button variant="success" value={result._id} onClick={this.handleJoin}>Join</Button></td>
            </tr>
        )
    }

    render() {
        return (
            <div>

                {/* Join PopUp - Fires when user clicks on "Join" */}
                {this.state.popup ? <JoinPopUp id={this.state.id} closePopup={this.handleJoin}/> : null}

                {/* Search Bar */}
                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        <InputGroup className="m-1">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="primary">
                                    Filters
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    
                        <FormControl type="text" placeholder="Search suggested" className="m-1" onChange={this.handleSearchChange} />
                        <Button variant="success" type="submit" className="m-1" onClick={this.handleSearch}>Search</Button>
                        <Button className="m-1" variant="danger">Reset</Button>
                    
                    </Form>
                </Navbar>

                {/* Groups Table */}
                <div className="col-sm-8 mx-auto mt-4 mb-5"> 
                    <h4 className="d-flex justify-content-center">Suggested Groups</h4>
                    <Table className="mx-auto mt-3" striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan="2">Group Name</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map(this.handleSearchResults)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }


}

export default FindGroup;
