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
import Header from './components/Header';
// import Footer from './components/Footer';
// import Navigation from './components/Navigation';
//import DummyHolder from './components/student/test/DummyHolder'



function App() {
  return (
    <BrowserRouter>
      <Route component={Header} />

      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' component={CreateAccount} />
        <Route path="/mock" component={Landing} />

        
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create" component={CreateGroup} />
        <Route path="/find" component={FindGroup} />
        <Route path="/auto" component={AutoGroup} />
        <Route path="/help" component={HelpStudent} />
        <Route path="/profile" component={StudentProfile} />

        {/* Dummy components. Testing how to do the above nested router idea*/}
        {/*
        <Route path="/dummies">
          <Header/>
          <DummyHolder/>
        </Route>
        */}
      </Switch>
    </BrowserRouter>

  );
}

export default App;