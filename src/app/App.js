import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./Header";
import Search from "./Search";
import Movie from "../movie/Movie";
import Home from "../home/Home";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Search/>
        <Router>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/movie/:id?" component={Movie} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
