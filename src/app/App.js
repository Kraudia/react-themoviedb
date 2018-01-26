import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from "./Header";
import Search from "./Search";
import Movie from "../movie/Movie";
import Home from "../home/Home";

class App extends Component {
  render() {

    return (
      <div>
        <Router>
          <div>
            <Header/>
            <Search/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/movie/:id" component={Movie}/>
              <Route component={Home}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
