import React, { Component } from 'react';
import { Route } from 'react-router';

import AccountContext from '../../providers/account_provider'
import Login from '../../pages/auth/login/login';

export default class ComponentWithAuth extends Component {
    static contextType = AccountContext;

    render() {
        return this.context.account_info === null ? <Login /> : <Route {...this.props} />
    }
}
