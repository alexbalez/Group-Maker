import React, { Component } from "react";
import "../components.css";
import {
  Button,
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Dropdown,
  Table,
  Container,
} from "react-bootstrap";
import StudentDataConnector from "../../services/StudentDataConnector";
import axios from "axios";
import GroupModal from "./GroupModal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      groups: [],
      popup: false,
      resolved: false,
      modalData: [],
      groupid: "",
      search: "",
      loaded: false,
    };
  }

  //a lot of these functions are near copies of FindGroups.js for loading
  // a bit redendant loading of data in getGroupInfo

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  handleSearch = (e) => {
    //need to fix for searc hing current groups
    e.preventDefault();
  };

  loadGroups = (groupids) => {
    // load groups from data.groups
    // mostly copied from modal to load users
    const promises = groupids.map((groupid) => {
      var res = axios.get("/group/" + groupid);
      return res;
    });

    Promise.all(promises).then((values) => {
      console.log(values);
      this.setState({ groups: values, resolved: true });
    });
  };

  handleGroups = (result, index) => {
    return (
      <tr key={result.data._id}>
        <td colSpan="2">{result.data.name}</td>
        <td>{result.data.description}</td>
        <td>
          <Button variant="warning" value={result.data._id} onClick={this.handleGroupPopup}>
            View
          </Button>
        </td>
      </tr>
    );
  };

  //load current groups
  //if the popup is being set to visible, load the group's data
  togglePopup = () => {
    this.setState({ popup: !this.state.popup }, () => {
      // needs to be in a callback, setState is async
      if (this.state.popup) {
        //set modal data here
        this.getGroupInfo(this.state.groupid);
      } else {
        // forget the data, workaround for hiding data lasting between group viewings
        this.setState({ modalData: [] });
      }
    });
  };

  //get group data for modal
  getGroupInfo = (groupid) => {
    axios.get("/group/" + groupid).then(
      (res) => {
        this.setState({ modalData: res.data });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  handleGroupPopup = (e) => {
    e.preventDefault();
    this.setState({ groupid: e.target.value });
    this.togglePopup();
  };

  componentDidMount() {
    //wrong
    //props are being passed by /App, and they don't exist when you open a new tab?
    if (this.state.data) {
      console.log(this.state.data.groups);
      this.loadGroups(this.state.data.groups);
    }

    if (!this.state.loaded) {
      StudentDataConnector.getDashboard()
        .then((result) => {
          this.setState({ data: result.data, loggedIn: true, loaded: true });
          console.log(this.state.data.groups);
        })
        .catch((err) => {
          this.setState({ loggedIn: false }); //user is not logged in
        });
    }
  }

  render() {
    return (
      <div>
        <Navbar className="bg-light justify-content-center">
          <Form inline>
            {/* Dropdown */}
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

            <FormControl
              type="text"
              placeholder="Search your groups"
              className="m-1"
              onChange={this.handleSearchChange}
            />
            <Button variant="success" type="submit" className="m-1" onClick={this.handleSearch}>
              Search
            </Button>
            <Button className="m-1" variant="primary">
              View Invites
            </Button>
          </Form>
        </Navbar>

        {/* Current Groups */}
        <Table className="col-sm-8 mx-auto mt-4 mb-2" striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2">Group name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.groups.length !== 0 ? (
              this.state.groups.map(this.handleGroups)
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  You're not in any groups. Try out the <a href="./find">Find page!</a>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {this.state.loaded ? (
          <GroupModal
            uid={this.state.data._id}
            data={this.state.modalData}
            toggle={this.togglePopup}
            show={this.state.popup}
            handleJoinGroup={this.state.handleGroupPopup}
          />
        ) : null}

        {/* Archived */}
        <Container className="col-8 mt-3">
          <Button variant="warning">Archived Groups</Button>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
