import { Component } from 'react'
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

import Home from '../../pages/home/home'
import Login from '../../pages/auth/login/login'
import Register from '../../pages/auth/register/register'
import LoggedinContext from '../../providers/loggedin_provider'
import Loader from '../loader/loader'
import oauth_login_from_response from '../../services/login'

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.toggle_loggedin = () => {
      console.log('ok')
      this.setState(state => ({
        loggedin:
          !state.loggedin,
      }))
    };

    this.state = {
      loading: true,
      loggedin: false,
      toggle_loggedin: this.toggle_loggedin,
    };
  }

  render() {
    return (
      <>
        <div>
          <GoogleLogin
            render={() => { return <></> }}
            clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
            onSuccess={async (response) => {
              await oauth_login_from_response(response, this.toggle_loggedin)
              this.setState({ loading: false })
            }}
            isSignedIn={true}
          />
        </div>
        {this.state.loading ? <Loader show={this.state.loading} /> :
          <div>
            <Helmet>
              <title>HCI Eng</title>
              <meta name="description" content="Humberside's official engineering club! Join now!" />
              <meta name="keywords" content="hci, humberside, engineering club, engineering, humberside collegiate institute" />
            </Helmet>
            <LoggedinContext.Provider value={this.state}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                </Switch>
              </Router>
            </LoggedinContext.Provider>
          </div>
        }
      </>
    )
  }
}

export default App;
