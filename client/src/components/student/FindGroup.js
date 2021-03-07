import React, { Component } from 'react'
import '../components.css'
import {Button, Form, InputGroup, FormControl, Dropdown, Table, Navbar} from 'react-bootstrap';
import axios from 'axios'
import GroupModal from './GroupModal';


class FindGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false,
            data: this.props.data,
            groupid: '',
            search: '',
            results: [],
            modalData: [],
        }

    }

    handleSearchChange = (e) => {
        e.preventDefault()
        this.setState({search: e.target.value})
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
    
    //get group data for modal
    getGroupInfo = (groupid) => {
        axios.get('/group/'+groupid)
        .then((res) => {
            this.setState({modalData: res.data})
        }, (err) => {
            console.log(err)
        })
    }

    handleSearchResults = (result, index) => {
        return(
            <tr key={index}>
                <td colSpan="2">{result.name}</td>
                <td>{result.description}</td>
                <td><Button variant="warning" value={result._id} onClick={this.handleJoinPopup}>View</Button></td>
            </tr>
        )
    }
    
    handleJoinPopup = (e) => {
        e.preventDefault()
        this.setState({groupid: e.target.value})
        this.togglePopup()
    }

    //if the popup is being set to visible, load the group's data
    togglePopup = () => {
        this.setState({popup: !this.state.popup}, () => {    
            // needs to be in a callback, setState is async    
            if(this.state.popup){
                this.getGroupInfo(this.state.groupid)
            } else {
                // forget the data, workaround for hiding data lasting between group viewings
                this.setState({modalData: []})
            }
        })
    }

    handleJoinGroup = (e) => {
        e.preventDefault()
        axios.post('/usergroupadd/'+this.state.data._id+'/'+this.state.groupid) 
        .then((res) => {
            //console.log(res)
        }, (err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>

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

                {/* Modal */}
                <GroupModal 
                    data={this.state.modalData}
                    toggle={this.togglePopup}
                    show={this.state.popup}
                    handleJoinGroup={this.handleJoinGroup}
                    />

            </div>
        );
    }


}

export default FindGroup;
