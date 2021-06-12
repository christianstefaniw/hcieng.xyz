import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { get_account_info } from '../services/account'

import Loader from '../components/loader/loader'

export default function WithAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        async componentDidMount() {
            let account_info = await get_account_info();
            if (account_info !== false) {
                this.setState({ loading: false })
                return
            }
            this.setState({ loading: false, redirect: true });
        }


        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return <Loader show={loading} />;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
}