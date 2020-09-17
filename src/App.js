import React from 'react';
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Settings from './pages/Settings.jsx'
import Stats from './pages/Stats.jsx'
import Badges from './pages/Badges.jsx'
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
            <Route path="/" component={Home} exact />
            <Route path="/settings" component={Settings} exact />
            <Route path="/stats" component={Stats} exact />
            <Route path="/badges" component={Badges} exact />
          </Switch>
        </Router>
      </Provider>
    </React.Fragment>
  )
}

export default App;
