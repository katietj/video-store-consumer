import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onSubmit = (event) => {
    event.preventDefault();

    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={this.onSubmit}>Search</button>
        </p>
      </div>
    );
  }
}

export default App;
