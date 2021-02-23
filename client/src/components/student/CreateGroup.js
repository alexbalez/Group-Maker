import React, { Component } from 'react'
import '../components.css'
import {Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import http from '../../services/HTTPHelper';

class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupType: 'Class Assignment',
            groupClass: 'COMP 3333',
            groupPreference1: 'None',
            groupPreference2: 'None',
            formGroupName: '',
            formDescription: ''
        };

        // Button Binding
        this.handleClearTapped = this.handleClearTapped.bind(this);
        this.handleCreateGroupTapped = this.handleCreateGroupTapped.bind(this);
        this.handleGroupTypeSelect = this.handleGroupTypeSelect.bind(this);
        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleGroupPreference1Select = this.handleGroupPreference1Select.bind(this);
        this.handleGroupPreference2Select = this.handleGroupPreference2Select.bind(this);
    }

    // Form Input References
    formGroupName = React.createRef();
    formDescription = React.createRef();

    componentDidMount() {
    }

    // TODO Refactor all these handles into one
    handleGroupTypeSelect(e){
        this.setState({groupType: e});
    }

    handleClassSelect(e){
        this.setState({groupClass: e});
    }

    handleGroupPreference1Select(e){
        this.setState({groupPreference1: e});
    }

    handleGroupPreference2Select(e){
        this.setState({groupPreference2: e});
    }

    // Create Group Button
    handleCreateGroupTapped(e){
        e.preventDefault();
        let POST = http.createPOST({
            name: this.formGroupName.current.value,
            description: this.formDescription.current.value,
            college: "GBC",
            campus: "Casa Loma",
            program: "T127",
            course: this.state.groupClass,
            project: "none",
            users: [this.props.user._id],
            preferences: [this.state.groupPreference1, this.state.groupPreference2]
        });

        fetch('/group', POST)
            .then(res => {
                // alert(res);
                console.log(res)
            })
            .catch(err => alert(err) );

    }

    // Clear Button
    handleClearTapped(){

    }

    render() {
        return (
            <div>
                {/*<Header history={this.props.history}/>*/}
                <div className="col-6 mx-auto mt-4">
                    <Form>

                        {/* Group Type */}
                        <h4 className="mt-3">Group Type</h4>
                        <InputGroup className="col-9 m-auto">
                            <Dropdown onSelect={this.handleGroupTypeSelect}>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    {this.state.groupType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Extracurricular">Extracurricular</Dropdown.Item>
                                    <Dropdown.Item eventKey="Class Assignment">Class Assignment</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown onSelect={this.handleClassSelect}>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    {this.state.groupClass}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="COMP 1111">COMP 1111</Dropdown.Item>
                                    <Dropdown.Item eventKey="COMP 2222">COMP 2222</Dropdown.Item>
                                    <Dropdown.Item eventKey="COMP 3333">COMP 3333</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        {/* Group Name */}
                        <h4 className="mt-5">Group Name</h4>
                        <Form.Group controlId="" className="col-9 m-auto">
                            <Form.Control ref={this.formGroupName} type="text" placeholder="e.g. Math Study Group" />
                        </Form.Group>

                        {/* Interests or Preferences */}
                        <h4 className="mt-5">Preferences (Optional)</h4>
                        <InputGroup className="mb-3 col-9 mx-auto">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Primary</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Dropdown onSelect={this.handleGroupPreference1Select}>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    {this.state.groupPreference1}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="MERN">MERN</Dropdown.Item>
                                    <Dropdown.Item eventKey="PHP">PHP</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ruby">Ruby</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        <InputGroup className="col-9 mx-auto">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Secondary</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Dropdown onSelect={this.handleGroupPreference2Select}>
                                <Dropdown.Toggle id="dropdown-basic" variant="light">
                                    {this.state.groupPreference2}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="GitHub">GitHub</Dropdown.Item>
                                    <Dropdown.Item eventKey="Bitbucket">Bitbucket</Dropdown.Item>
                                    <Dropdown.Item eventKey="GitElse">GitElse</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>

                        {/* Description */}
                        <h4 className="mt-5">Description</h4>
                        <Form.Group controlId="" className="col-9 m-auto">
                            <Form.Control ref={this.formDescription} as="textarea" rows={3}/>
                        </Form.Group>

                        {/* Submit or Clear */}
                        <Button onClick={this.handleCreateGroupTapped} variant="success" type="submit" className="col-8 mx-auto btn-block mt-4">
                            Create Group
                        </Button>
                        <Button variant="danger" type="submit" className="col-8 mx-auto btn-block my-4">
                            Clear
                        </Button>
                    </Form>
                </div>

            </div>
        );
    }


}

export default CreateGroup;
