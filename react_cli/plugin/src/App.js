import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import About from './About'
import DetailsPlugin from './DetailsPlugin'


import {Route} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
 
class App extends Component {
  
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div id="app">
      <Router>
        <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/detailsPlugin/:id" component={DetailsPlugin}/>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;

