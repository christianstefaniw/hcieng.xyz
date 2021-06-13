import { Component } from 'react';

import AccountContext from '../providers/account_provider'
import Login from '../pages/auth/login/login';

export default function WithAuth(ComponentToProtect) {
    return class extends Component {
        static contextType = AccountContext;

        render() {
            return this.context.account_info === null ? <Login /> : <ComponentToProtect {...this.props} />
        }
    }
}