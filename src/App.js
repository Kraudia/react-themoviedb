import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { BASE_NAME } from './config';
import Header from './shared/Header';
import SearchBar from './shared/SearchBar';
import Home from './home/Home';
import Search from './search/Search';
import Movie from './movie/Movie';

class App extends Component {
  render() {
    return (
      <Router basename={BASE_NAME}>
        <div>
          <Header/>
          <SearchBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/search/:query" component={Search}/>
            <Route path="/movie/:id" component={Movie}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
