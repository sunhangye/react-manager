import React, { Component } from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom'
import Home from './Home'
import Main from './Main'
import Topic from './Topic'

export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <Home>
          <Route path="/" component={Main}></Route>
          <Route path="/topic" component={Topic} ></Route>
          
        </Home>
      </Router>
    );
  }
}

