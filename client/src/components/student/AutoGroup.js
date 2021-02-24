import React, { Component } from 'react'
import {Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import '../components.css'

class AutoGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupType: 'Class Assignment',
            groupClass: 'COMP 3333',
            groupPreference1: 'None',
            groupPreference2: 'None',
        };

        this.handleGroupTypeSelect = this.handleGroupTypeSelect.bind(this);
        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleGroupPreference1Select = this.handleGroupPreference1Select.bind(this);
        this.handleGroupPreference2Select = this.handleGroupPreference2Select.bind(this);
    }

    componentDidMount() {
    }

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

    render() {
        return (
            <div className="col-6 mx-auto mt-4">
                {/*<Header history={this.props.history}/>*/}
                <Form>
                <div style={{ height: "300px" }} className="m-5">
                    <h1>Auto</h1>
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

                          {/* Submit  */}
                          <Button onClick={this.handleSendJoinRequestTapped} variant="success" type="submit" className="col-8 mx-auto btn-block mt-4">
                            Send Join Request
                        </Button>
                        

                </div>
                </Form>

            </div>
        );
    }


}

export default AutoGroup;
