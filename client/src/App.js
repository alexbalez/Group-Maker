import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing';
import Login from './components/Login'




function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={ Login } />
          <Route path="/mock" component={ Landing }/>
        </Switch>
      </BrowserRouter>

  );
}

export default App;
