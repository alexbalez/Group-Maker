import {React, Component} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/student/Dashboard'
import CreateGroup from "./components/student/CreateGroup";
import FindGroup from "./components/student/FindGroup";
import AutoGroup from "./components/student/AutoGroup";
import HelpStudent from "./components/student/HelpStudent";
import StudentProfile from "./components/student/StudentProfile"; //Switched to version2 for now 
import AppHeader from './components/AppHeader';
import Footer from "./components/Footer";
import StudentDataConnector from './services/StudentDataConnector'
import AppNavHolder from "./components/AppNavHolder";
import FourOhFour from "./components/404"

import AdminDashboard from './components/admin/AdminDashboard';
import AdminParamsSearch from './components/admin/AdminParamsSearch';
import AdminAllCampuses from "./components/admin/campuses/AdminAllCampuses";
import AdminUpdateCampus from "./components/admin/campuses/AdminUpdateCampus";
import AdminAddCampus from "./components/admin/campuses/AdminAddCampus";
import AdminPrograms from "./components/admin/programs/AdminPrograms";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount(){

        //check if cookie

        StudentDataConnector.getDashboard()
            .then(result => {
                this.setState({ userdata: result.data, loggedIn: true })
            })
            .catch(err => {
                this.setState({ loggedIn: false }) //user is not logged in
            })
    }

    render(){
        //can also check here for user type and then load appropriate dashboard
        //protected routes
        
        if (this.state.loggedIn){
            //console.log(this.state.userdata.email)
            return (
                <BrowserRouter>
                    <AppHeader />
                    <AppNavHolder data={this.state.userdata}/>
                    <div className="App-body">
                        <Switch>

                            <Route path="/dashboard"><Dashboard data={this.state.userdata}/></Route>
                            <Route path="/create"><CreateGroup user={this.state.userdata}/></Route>
                            <Route exact path="/find"><FindGroup data={this.state.userdata} /></Route>
                            <Route exact path="/find/:id" render={(props) => <FindGroup id={props.match.params.id} data={this.state.userdata} />} />
                            <Route path="/auto" component={AutoGroup} />
                            <Route path="/help" component={HelpStudent} />
                            <Route path="/profile"><StudentProfile data={this.state.userdata}/></Route>
                            <Route path="/" exact component={Dashboard} />
                            <Route path="/*" component={FourOhFour} />

                            {/* <Route path="/admin-dashboard" component={AdminDashboard}></Route> */}
                        </Switch>
                    </div>
                    <Footer/>
                </BrowserRouter>
            )
        }
        //user not logged in, unprotected routes
        else{
            return (
                <BrowserRouter>
                    <AppHeader/>
                    <Switch>
                        {/*This to be moved after Admin Auth*/} 
                        <Route path="/admin-dashboard" component={AdminDashboard}></Route>
                        <Route path="/admin-params-search" component={AdminParamsSearch}></Route>
                        <Route path="/admin-campuses" component={AdminAllCampuses}></Route>
                        <Route path="/admin-update-campus" component={AdminUpdateCampus}></Route>
                        <Route path="/admin-add-campus" component={AdminAddCampus}></Route>
                        <Route path="/admin-programs" component={AdminPrograms}></Route>

                        <Route path='/signup' component={CreateAccount} />
                        <Route path="/*" component={Login}/>

                       
                    </Switch>
                    <Footer />
                </BrowserRouter>
            )
        }
    }
}

export default App;
