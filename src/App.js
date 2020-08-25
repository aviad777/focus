import React from 'react';
import Timer from './components/Timer.jsx'
import Navbar from './components/Navbar.jsx'
import { history } from '../src/history'
import { Switch, Route, Router } from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import Store from './store';


function App() {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/" component={Timer} exact />
          </Switch>
        </Router>
      </Provider>
    </React.Fragment>
  )
}

export default App;
