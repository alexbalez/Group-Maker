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
import StudentProfile from "./components/student/StudentProfile";
import AppHeader from './components/AppHeader';
import Footer from "./components/Footer";
import StudentDataConnector from './services/StudentDataConnector'
import AppNavHolder from "./components/AppNavHolder";
import FourOhFour from "./components/404"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount(){
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
            console.log(this.state.userdata.email)
            return (
                <BrowserRouter>
                    <AppHeader />
                    <AppNavHolder data={this.state.userdata}/>
                    <div className="App-body">
                        <Switch>
                            {/* <Route path="/dashboard" component={Dashboard} /> */}
                            <Route path="/dashboard">
                                <Dashboard data={this.state.userdata}/>
                            </Route>
                            <Route path="/create" component={CreateGroup} />
                            <Route path="/find" component={FindGroup} />
                            <Route path="/auto" component={AutoGroup} />
                            <Route path="/help" component={HelpStudent} />
                            <Route path="/profile" component={StudentProfile} />
                            <Route path="/" exact component={Dashboard} />
                            <Route path="/*" component={FourOhFour} />
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
