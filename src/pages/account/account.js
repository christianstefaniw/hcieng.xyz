import { Component } from 'react'

import TopNav from '../../components/nav/nav'
import AccountContext from '../../providers/account_provider'


class Account extends Component {
    static contextType = AccountContext;

    render() {
        return (
            <>
                <TopNav />
                <p>email: {this.context.account_info.email}</p>
            </>
        )
    }
}

export default Account