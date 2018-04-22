import React, { Component } from 'react';
import logo from './logo.svg';
import Searchbar from './SearchBar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Searchbar />
        </header>
      </div>
    );
  }
}

export default App;
