import React, { Component } from "react";
import "../components.css";
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import http from "../../services/HTTPHelper";
import axios from "axios";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupType: "Course Assignment",
      courses: [],
      preferences: [],
      projects: [],
      selectedProjectCode: "None",
      selectedProjectID: "60689e5660efb17b48a0401d",
      selectedCourseCode: "None",
      selectedCourseID: "",
      selectedPreference1ID: "",
      selectedPreference1Name: "None",
      selectedPreference2ID: "",
      selectedPreference2Name: "None",
      formGroupName: "",
      formDescription: "",
    };
  }

  componentDidMount() {
    fetch("/courses-from-ids/" + JSON.stringify(this.props.user.courses))
      .then((res) => res.json())
      .then((courses) =>
        this.setState({ courses }, () => {
          console.log("Loaded registered courses:");
          console.log(this.state.courses);

          // TODO - TESTING COURSE LOADING
          // let mockCourses = [
          //     {name: "Data Structures", code: "COMP 2146", _id: 1001},
          //     {name: "Object Oriented Programming", code: "COMP 2078", _id: 1002},
          //     {name: "Cybersecurity", code: "COMP 2201", _id: 1003},
          //     {name: "Mobile Development", code: "COMP 2132", _id: 1004},
          //     {name: "Web Development", code: "COMP 2058", _id: 1005},
          //     ];
          // this.setState({courses: mockCourses});
        })
      );
    fetch("/preferences")
      .then((res) => res.json())
      .then((preferences) =>
        this.setState({ preferences }, () => {
          console.log("Loaded preferences:");
          console.log(preferences);
          this.setState({ preferences });
        })
      );
  }

  // Form Input References
  formGroupName = React.createRef();
  formDescription = React.createRef();

  // TODO Refactor all these handles into one
  handleGroupTypeSelect = (e) => {
    this.setState({ groupType: e });
  };

  handleProjectSelect = (e) => {
    let projectArray = e.split(",");
    this.setState({ selectedProjectID: projectArray[0] });
    this.setState({ selectedProjectCode: projectArray[1] });
  };

  handleCourseSelect = (e) => {
    let courseArray = e.split(","); // id: index 0, code: index 1
    this.setState({ selectedCourseID: courseArray[0] });
    this.setState({ selectedCourseCode: courseArray[1] });
  };

  handleGroupPreference1Select = (e) => {
    let preferenceArray = e.split(","); // id: index 0, code: index 1
    this.setState({ selectedPreference1ID: preferenceArray[0] });
    this.setState({ selectedPreference1Name: preferenceArray[1] });
  };

  handleGroupPreference2Select = (e) => {
    let preferenceArray = e.split(","); // id: index 0, code: index 1
    this.setState({ selectedPreference2ID: preferenceArray[0] });
    this.setState({ selectedPreference2Name: preferenceArray[1] });
  };

  // Create Group Button
  handleCreateGroupTapped = (e) => {
    e.preventDefault();
    axios
      .post("/group", {
        name: this.formGroupName.current.value,
        description: this.formDescription.current.value,
        college: this.props.user.colleges[0],
        campus: this.props.user.campuses[0],
        program: this.props.user.programs[0],
        course: this.state.selectedCourseID,
        project: this.state.selectedProjectID,
        users: [this.props.user._id],
        preferences: [this.state.selectedPreference1ID, this.state.selectedPreference2ID],
      })
      .then((group) => {
        axios.post("/usergroupadd/" + this.props.user._id + "/" + group.data._id).then(
          () => {
            alert("Group Created: " + group.data._id);
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Clear Button
  handleClearTapped = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        {/*<Header history={this.props.history}/>*/}
        <div className="col-sm-8 mx-auto mt-4">
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
                  <Dropdown.Item eventKey="Course Assignment">Course Assignment</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown onSelect={this.handleCourseSelect}>
                <Dropdown.Toggle id="dropdown-basic" variant="light">
                  {this.state.selectedCourseCode}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.courses.map((course) => (
                    <Dropdown.Item eventKey={course._id + "," + course.code}>
                      {course.code}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            {/* Group Name */}
            <h4 className="mt-5">Group Name</h4>
            <Form.Group controlId="" className="col-9 m-auto">
              <Form.Control
                ref={this.formGroupName}
                type="text"
                placeholder="e.g. Math Study Group"
              />
            </Form.Group>

            {/* Interests or Preferences */}
            <h4 className="mt-5">Preferences (Optional)</h4>
            <InputGroup className="mb-3 col-9 mx-auto">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Primary</InputGroup.Text>
              </InputGroup.Prepend>
              <Dropdown onSelect={this.handleGroupPreference1Select}>
                <Dropdown.Toggle id="dropdown-basic" variant="success">
                  {this.state.selectedPreference1Name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.preferences.map((preference) => (
                    <Dropdown.Item eventKey={preference._id + "," + preference.description}>
                      {preference.description}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            <InputGroup className="col-9 mx-auto">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Secondary</InputGroup.Text>
              </InputGroup.Prepend>
              <Dropdown onSelect={this.handleGroupPreference2Select}>
                <Dropdown.Toggle id="dropdown-basic" variant="success">
                  {this.state.selectedPreference2Name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.preferences.map((preference) => (
                    <Dropdown.Item eventKey={preference._id + "," + preference.description}>
                      {preference.description}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            {/*Project */}
            <h4 className="mt-5">Project</h4>
            <InputGroup className="col-9 mx-auto">
              <Dropdown onSelect={this.handleProjectSelect}>
                <Dropdown.Toggle id="dropdown-basic" variant="light">
                  {this.state.selectedProjectCode}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.projects.map((project) => (
                    <Dropdown.Item eventKey={project._id + "," + project.name}>
                      {project.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            {/* Description */}
            <h4 className="mt-5">Description</h4>
            <Form.Group controlId="" className="col-9 m-auto">
              <Form.Control
                ref={this.formDescription}
                as="textarea"
                rows={3}
                placeholder="Add a description to make your group easier to find."
              />
            </Form.Group>

            {/* Submit or Clear */}
            <Button
              onClick={this.handleCreateGroupTapped}
              variant="success"
              type="submit"
              className="col-8 mx-auto btn-block mt-4"
            >
              Create Group
            </Button>
            <Button
              variant="danger"
              className="col-8 mx-auto btn-block my-4"
              onClick={this.handleClearTapped}
            >
              Clear
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
