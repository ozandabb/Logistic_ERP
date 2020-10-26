import React from 'react';
import login from "../src/Views/SignIn/SignIn"
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path="/" component={login} />
    </Router>

  );
}

export default App;
