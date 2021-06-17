import { Component } from 'react'
import { Helmet } from "react-helmet";
import {
  Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from '../../pages/home/home'
import Login from '../../pages/auth/login/login'
import Register from '../../pages/auth/register/register'
import Account from '../../pages/account/account'
import Chat from '../../pages/chat/chat'

import AccountContext from '../../providers/account_provider'
import Loader from '../loader/loader'
import WithAuth from '../../middleware/with_auth'
import { get_account_info } from '../../services/account'

import './App.scss';
import history from '../../history';


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
      add_account_info: this.add_account_info,
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
              <Router history={history}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/chat/:id" component={WithAuth(Chat)} />
                  <Route exact path="/login">
                    {this.state.account_info !== null ? <Redirect to='/account' /> : <Login />}
                  </Route>
                  <Route exact path="/register">
                    {this.state.account_info !== null ? <Redirect to='/account' /> : <Register />}
                  </Route>
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
