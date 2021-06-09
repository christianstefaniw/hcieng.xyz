import { Component } from 'react'
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from '../../pages/home/home'
import Login from '../../pages/login/login'
import './App.scss';


class App extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>HCI Eng</title>
          <meta name="description" content="Humberside's official engineering club! Join now!" />
          <meta name="keywords" content="hci, humberside, engineering club, engineering, humberside collegiate institute" />
        </Helmet>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App;
