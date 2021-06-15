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
                <p>name: {this.context.account_info.first} {this.context.account_info.last}</p>

                {this.context.account_info.is_admin ? <p>Welcome admin!</p> : <></>}
            </>
        )
    }
}

export default Account