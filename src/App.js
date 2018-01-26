import React, { Component } from 'react';
import Header from "./components/Header";
import SearchComponent from "./components/Search";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <SearchComponent/>
      </div>
    );
  }
}

export default App;
