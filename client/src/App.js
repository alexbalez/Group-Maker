import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/student/Dashboard'




function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={ Login } />
          <Route path='/signup' component={ CreateAccount } />
          <Route path="/mock" component={ Landing } />
          <Route path="/dashboard" component={ Dashboard } />
        </Switch>
      </BrowserRouter>

  );
}

export default App;
