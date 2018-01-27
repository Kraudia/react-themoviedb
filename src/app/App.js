import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from "./Header";
import Search from "./Search";
import Movie from "../movie/Movie";
import Home from "../home/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Search/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/movie/:id" component={Movie}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
