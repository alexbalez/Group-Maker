
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import Employees from './components/Employees';
import EmployeeList from './components/EmployeeList';
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import ViewEmployee from "./components/ViewEmployee"
import Header from "./components/Header";


function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <div className="App">
        <Switch>
          <Route path="/" exact component={EmployeeList} />
          <Route path="/add" component={AddEmployee} />
          <Route path="/edit/:id" component={EditEmployee} />
          <Route path="/view/:id" component={ViewEmployee} />
        </Switch>
      </div>

      </BrowserRouter>
  );
}

export default App;
