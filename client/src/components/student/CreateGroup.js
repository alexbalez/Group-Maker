import React, { Component } from 'react';
import '../components.css';
import Navigation from '../Navigation'
import Header from '../Header'
import Footer from '../Footer'
import {Button, Form, InputGroup, FormControl, Dropdown} from 'react-bootstrap';

class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            extracurricular: true
        };
        // Binding click
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    componentDidMount() {
    }

    handleTypeChange(e){
        e.preventDefault();
        this.setState({extracurricular: !this.state.extracurricular});
    }

    render() {
        return (
            <div>
                <Header />
                <Navigation active="create" history={this.props.history}/>
                <div className="col-4 mx-auto mt-4">
                    <Form>
                        {/* Extracurricular or Assignment Group */}
                        <div className="d-flex justify-content-center">
                            <Button onClick={this.handleTypeChange} variant={this.state.extracurricular ? "success" : "light" } type="submit" className="mt-4 mr-3">
                                Extracurricular
                            </Button>
                            <Button onClick={this.handleTypeChange} variant={this.state.extracurricular ? "light" : "success" } type="submit" className="mt-4">
                                Class Assignment
                            </Button>
                        </div>

                        {/* Program Level */}
                        <InputGroup className="d-flex justify-content-center mt-5 col-9">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    Filter Level: Program
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        {/* Group Name */}
                        <h4 className="mt-5">Group Name</h4>
                        <Form.Group controlId="" className="col-9 m-auto">
                            <Form.Control type="text" placeholder="e.g. Math Study Group" />
                        </Form.Group>

                        {/* Interests or Preferences */}
                        <h4 className="mt-5">
                            {this.state.extracurricular ? "Interests" : "Preferences (Optional)" }
                        </h4>
                        <InputGroup className="mb-3 col-9 mx-auto">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Primary</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    None Selected
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        <InputGroup className="col-9 mx-auto">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Secondary</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    None Selected
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        {/* Description */}
                        <h4 className="mt-5">Description</h4>
                        <Form.Group controlId="" className="col-9 m-auto">
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>

                        {/* Submit or Clear */}
                        <Button variant="success" type="submit" className="col-8 mx-auto btn-block mt-4">
                            Create Group
                        </Button>
                        <Button variant="danger" type="submit" className="col-8 mx-auto btn-block my-4">
                            Clear
                        </Button>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }


}

export default CreateGroup;
