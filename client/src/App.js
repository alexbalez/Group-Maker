import { React, Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/student/Dashboard";
import CreateGroup from "./components/student/CreateGroup";
import FindGroup from "./components/student/FindGroup";
import AutoGroup from "./components/student/AutoGroup";
import HelpStudent from "./components/student/HelpStudent";
import StudentProfile from "./components/student/StudentProfile"; //Switched to version2 for now
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import StudentDataConnector from "./services/StudentDataConnector";
import AppNavHolder from "./components/AppNavHolder";
import FourOhFour from "./components/404";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminParamsSearch from "./components/admin/AdminParamsSearch";
import AdminAllCampuses from "./components/admin/campuses/AdminAllCampuses";
import AdminUpdateCampus from "./components/admin/campuses/AdminUpdateCampus";
import AdminAddCampus from "./components/admin/campuses/AdminAddCampus";
import AdminPrograms from "./components/admin/programs/AdminPrograms";
import AdminUpdateProgram from "./components/admin/programs/AdminUpdateProgram";
import AdminAddProgram from "./components/admin/programs/AdminAddProgram";
import AdminCourses from "./components/admin/courses/AdminCourses";
import AdminAddCourse from "./components/admin/courses/AdminAddCourse";
import AdminUpdateCourse from "./components/admin/courses/AdminUpdateCourse";
import AdminProjects from "./components/admin/projects/AdminProjects";
import AdminUpdateProject from "./components/admin/projects/AdminUpdateProject";
import AdminAddProject from "./components/admin/projects/AdminAddProject";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    //check if cookie

    StudentDataConnector.getDashboard()
      .then((result) => {
        this.setState({ userdata: result.data, loggedIn: true });
      })
      .catch((err) => {
        this.setState({ loggedIn: false }); //user is not logged in
      });
  }

  render() {
    //can also check here for user type and then load appropriate dashboard
    //protected routes

    if (this.state.loggedIn) {
      //console.log(this.state.userdata.email)
      return (
        <BrowserRouter>
          <div className="App-body">
            <AppHeader />
            <AppNavHolder data={this.state.userdata} />
            <Switch>
              <Route path="/" exact>
                <Dashboard data={this.state.userdata} />
              </Route>
              <Route path="/dashboard">
                <Dashboard data={this.state.userdata} />
              </Route>
              <Route path="/create">
                <CreateGroup user={this.state.userdata} />
              </Route>
              <Route exact path="/find">
                <FindGroup data={this.state.userdata} />
              </Route>
              <Route
                exact
                path="/find/:id"
                render={(props) => (
                  <FindGroup id={props.match.params.id} data={this.state.userdata} />
                )}
              />
              <Route path="/auto" component={AutoGroup} />
              <Route path="/help" component={HelpStudent} />
              <Route path="/profile">
                <StudentProfile data={this.state.userdata} />
              </Route>
              {this.state.userdata.roles[0] === "606b384823ae931e014806e8" ? (
                <div>
                  <Route path="/admin-dashboard" component={AdminDashboard}></Route>
                  <Route path="/admin-params-search" component={AdminParamsSearch}></Route>
                  <Route path="/admin-campuses" component={AdminAllCampuses}></Route>
                  <Route path="/admin-update-campus" component={AdminUpdateCampus}></Route>
                  <Route path="/admin-add-campus" component={AdminAddCampus}></Route>
                  <Route path="/admin-programs" component={AdminPrograms}></Route>
                  <Route path="/admin-update-program" component={AdminUpdateProgram}></Route>
                  <Route path="/admin-add-program" component={AdminAddProgram}></Route>
                  <Route path="/admin-courses" component={AdminCourses}></Route>
                  <Route path="/admin-add-course" component={AdminAddCourse}></Route>
                  <Route path="/admin-update-course" component={AdminUpdateCourse}></Route>
                  <Route path="/admin-projects" component={AdminProjects}></Route>
                  <Route path="/admin-update-project" component={AdminUpdateProject}></Route>
                  <Route path="/admin-add-project" component={AdminAddProject}></Route>
                </div>
              ) : null}
              <Route path="/*" component={FourOhFour} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      );
    }
    //user not logged in, unprotected routes
    else {
      return (
        <BrowserRouter>
          <div className="App-body">
            <AppHeader />
            <Switch>
              <Route path="/signup" component={CreateAccount} />
              <Route path="/*" component={Login} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      );
    }
  }
}

export default App;
