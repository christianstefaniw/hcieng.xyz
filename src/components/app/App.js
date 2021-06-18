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
import ChatPage from '../../pages/chat/chat'

import AccountContext from '../../providers/account_provider'
import LoadingContext from '../../providers/root_loading_provider'
import Loader from '../loader/loader'
import WithAuth from '../../middleware/with_auth'
import { get_account_info } from '../../services/account'

import './App.scss';
import history from '../../history';


class App extends Component {
  constructor() {
    super();
    this.add_account_info = (account) => {
      let account_state = { ...this.state.account };
      account_state.account_info = account;
      this.setState({ account: account_state })
    };

    this.state = {
      loading: {
        loading: true,
      },
      account: {
        account_info: null,
        add_account_info: this.add_account_info,
      }
    };
  }

  async componentDidMount() {
    let account_info = await get_account_info();
    if (account_info !== false) {
      this.add_account_info(account_info);
    }
    let loading_state = { ...this.state.loading }
    loading_state.loading = false;
    this.setState({ loading: loading_state })
  }

  render() {
    return (
      <>
        {this.state.loading.loading ? <Loader show={this.state.loading.loading} /> :
          <div>
            <Helmet>
              <title>HCI Eng</title>
              <meta name="description" content="Humberside's official engineering club! Join now!" />
              <meta name="keywords" content="hci, humberside, engineering club, engineering, humberside collegiate institute" />
            </Helmet>
            <AccountContext.Provider value={this.state.account}>
              <LoadingContext.Provider value={this.state.loading}>
                <Router history={history}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/chat/:id" component={WithAuth(ChatPage)} />
                    <Route exact path="/login">
                      {this.state.account.account_info !== null ? <Redirect to='/account' /> : <Login />}
                    </Route>
                    <Route exact path="/register">
                      {this.state.account.account_info !== null ? <Redirect to='/account' /> : <Register />}
                    </Route>
                    <Route exact path='/account' component={WithAuth(Account)} />
                  </Switch>
                </Router>
              </LoadingContext.Provider>
            </AccountContext.Provider>
          </div>
        }
      </>
    )
  }
}

export default App;
