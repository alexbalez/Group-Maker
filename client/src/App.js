import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/student/Dashboard'
import CreateGroup from "./components/student/CreateGroup";
import FindGroup from "./components/student/FindGroup";
import AutoGroup from "./components/student/AutoGroup";
import HelpStudent from "./components/student/HelpStudent";
import StudentProfile from "./components/student/StudentProfile";



function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={ Login } />
          <Route path='/signup' component={ CreateAccount } />
          <Route path="/mock" component={ Landing } />

          {/* Student components */}
          {/* todo: change routing scheme to nested routers. Upon login, should load a user component,
          then get that user's information, and share it between child components so that there aren't so many calls 
          to the backend. Navigation component would be the first child of the user component
           */}
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/create" component={ CreateGroup }/>
          <Route path="/find" component={ FindGroup } />
          <Route path="/auto" component={ AutoGroup } />
          <Route path="/help" component={ HelpStudent } />
          <Route path="/profile" component={ StudentProfile } />
        </Switch>
      </BrowserRouter>

  );
}

export default App;
