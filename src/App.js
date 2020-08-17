import React from 'react';
import Timer from './components/Timer.jsx'
import Navbar from './components/Navbar.jsx'
import { history } from '../src/history'
import { Switch, Route, Router } from "react-router-dom";
import './App.css';


function App() {


  return (

    <React.Fragment>
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/" component={Timer} exact />
        </Switch>
      </Router>
    </React.Fragment>

  )

}

export default App;
