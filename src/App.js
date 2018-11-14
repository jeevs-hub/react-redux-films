import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayFilms from './components/DisplayFilms';
import CreateFilms from './components/CreateFilms';

class App extends Component {
  render() {
    return (
          <div className="App">
            <CreateFilms />
            <DisplayFilms />
          </div>
    );
  }
}

export default App;
