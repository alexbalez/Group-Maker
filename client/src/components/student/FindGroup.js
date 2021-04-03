import React, { Component } from "react";
import "../components.css";
import { Button, Form, InputGroup, FormControl, Dropdown, Table, Navbar } from "react-bootstrap";
import axios from "axios";
import GroupModal from "./GroupModal";

class FindGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      data: this.props.data,
      groupid: "",
      search: "",
      results: [],
      modalData: [],
      loaded: false,
      filter: "",
    };

    console.log(this.state.data);

    if (props.id) {
      console.log(props.id);
      //hack
      setTimeout(() => {
        this.togglePopup(props.id);
      }, 500);
    }
  }

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  handleSelect = (e) => {
    console.log(e);
  };

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    axios
      .post("/groups/s/name", {
        name: this.state.search,
      })
      .then(
        (res) => {
          //in progress
          var results = [];
          if (this.state.filter === "course") {
            for (var data in res.data) {
              if (this.state.data.courses.includes(data.course)) {
                results.push(data);
              }
            }
          } else if (this.state.filter === "program") {
          } else if (this.state.filter === "campus") {
          } else {
          }
          this.setState({ results: res.data });
        },
        (err) => {
          console.log("err", err);
        }
      );
  };

  //get group data for modal
  getGroupInfo = (groupid) => {
    axios.get("/group-info/" + groupid).then(
      (res) => {
        this.setState({ modalData: res.data });
        console.log(this.state.modalData);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  handleSearchResults = (result, index) => {
    return (
      <tr key={index}>
        <td colSpan="2">{result.name}</td>
        <td>{result.description}</td>
        <td>
          <Button variant="warning" value={result._id} onClick={this.handleJoinPopup}>
            View
          </Button>
        </td>
      </tr>
    );
  };

  //actions are:
  // page load, search done, view button's value set to group id.
  // view button clicked -> popup modal shown ->  getGroupInfo
  // axios req data -> store modalData -> modal takes over
  // takes data from props -> displays
  // waits for axios userlist -> pass to UserList
  // modal checks if user in group  -> sets button join/leave
  // if button clicked -> handleJoinGroup

  handleJoinPopup = (e) => {
    e.preventDefault();
    this.setState({ groupid: e.target.value });
    this.togglePopup();
  };

  //if the popup is being set to visible, load the group's data
  togglePopup = (urlid) => {
    this.setState({ popup: !this.state.popup }, () => {
      // needs to be in a callback, setState is async
      if (this.state.popup) {
        //if qr, load from url
        console.log(this.props.id);
        if (urlid) {
          this.getGroupInfo(urlid);
        } else {
          this.getGroupInfo(this.state.groupid);
        }
      } else {
        // forget the data, workaround for hiding data lasting between group viewings
        this.setState({ modalData: [] });
      }
    });
  };

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <div>
        {/* Search Bar */}
        <Navbar className="bg-light justify-content-center">
          <Form inline>
            <InputGroup className="m-1">
              <Dropdown onSelect={this.handleSelect}>
                <Dropdown.Toggle id="dropdown-basic" variant="primary">
                  Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="course" href="#/action-1">
                    Course
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="program" href="#/action-2">
                    Program
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="campus" href="#/action-3">
                    Campus
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>

            <FormControl
              type="text"
              placeholder="Search suggested"
              className="m-1"
              onChange={this.handleSearchChange}
            />
            <Button variant="success" type="submit" className="m-1" onClick={this.handleSearch}>
              Search
            </Button>
            <Button className="m-1" variant="danger">
              Reset
            </Button>
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
            <tbody>{this.state.results.map(this.handleSearchResults)}</tbody>
          </Table>
        </div>

        {/* Modal */}
        <GroupModal
          uid={this.state.data._id}
          data={this.state.modalData}
          toggle={this.togglePopup}
          show={this.state.popup}
        />
        {this.state.loaded ? this.setState({ loaded: true }) && this.togglePopup : null}
      </div>
    );
  }
}

export default FindGroup;
