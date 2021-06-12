import { Component } from 'react'
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from '../../pages/home/home'
import Login from '../../pages/auth/login/login'
import Register from '../../pages/auth/register/register'
import Account from '../../pages/account/account'

import AccountContext from '../../providers/account_provider'
import Loader from '../loader/loader'
import WithAuth from '../../middleware/with_auth'
import { get_account_info } from '../../services/account'

import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.add_account_info = (account) => {
      this.setState({
        account_info: account,
      })
    };

    this.state = {
      loading: true,
      account_info: null,
      create_account_info: this.add_account_info,
    };
  }

  async componentDidMount() {
    let account_info = await get_account_info();
    if (account_info !== false) {
      this.add_account_info(account_info);
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loader show={this.state.loading} /> :
          <div>
            <Helmet>
              <title>HCI Eng</title>
              <meta name="description" content="Humberside's official engineering club! Join now!" />
              <meta name="keywords" content="hci, humberside, engineering club, engineering, humberside collegiate institute" />
            </Helmet>
            <AccountContext.Provider value={this.state}>
              <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path='/account' component={WithAuth(Account)} />
                </Switch>
              </Router>
            </AccountContext.Provider>
          </div>
        }
      </>
    )
  }
}

export default App;
