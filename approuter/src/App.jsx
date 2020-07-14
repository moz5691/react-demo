import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import DashBoard from './components/Dashboard';
import About from './components/About';
import Device from './components/Device';



const AppRouter = () => {

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/dashboard'>
          <DashBoard />
        </Route>
        <Route path='/device/:id'>
          <Device />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter;
