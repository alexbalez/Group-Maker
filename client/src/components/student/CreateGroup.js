import React, { Component } from 'react'
import '../components.css'
import Footer from '../Footer'
import {Button, Form, InputGroup, Dropdown} from 'react-bootstrap';

class CreateGroup extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*<Header history={this.props.history}/>*/}
                <div className="col mx-auto mt-4">
                    <Form>

                        {/* Group Type */}
                        <h4 className="mt-3">Group Type</h4>
                        <InputGroup className="col-9 m-auto">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    Class Assignment
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Extracurricular</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="">
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    COMP 3134
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">COMP 1111</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">COMP 2222</Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">COMP 3333</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        {/* Group Name */}
                        <h4 className="mt-5">Group Name</h4>
                        <Form.Group controlId="" className="col-9 m-auto">
                            <Form.Control type="text" placeholder="e.g. Math Study Group" />
                        </Form.Group>

                        {/* Interests or Preferences */}
                        <h4 className="mt-5">Preferences (Optional)</h4>
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
