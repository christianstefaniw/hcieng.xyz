import { Component } from 'react'
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopNav from '../../../components/nav/nav'
import Loader from '../../../components/loader/loader'
import AccountContext from '../../../providers/account_provider'
import history from '../../../history';
import { login, OauthLogin } from './services'

import '../auth.scss'

class Login extends Component {
    static contextType = AccountContext;

    constructor() {
        super()
        this.state = {
            show_pass: false,
            loading: false,
            email: "",
            password: "",
        }
    }

    start_loading = () => {
        this.setState({
            loading: true
        })
    }

    stop_loading = () => {
        this.setState({
            loading: false
        })
    }

    handle_change = (evt) => {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value,
        })
    }

    handle_submit = async (evt) => {
        evt.preventDefault();
        let { email, password } = this.state;
        this.start_loading();
        await login(email, password, this.context.add_account_info);
        this.stop_loading();
        history.push('/account');
    }

    toggle_show_pass = () => {
        this.setState(prev_state => ({ show_pass: !prev_state.show_pass }))
    }

    render() {
        return (
            <>
                <TopNav signup={true} />
                <Loader show={this.state.loading} variant='secondary' />
                <Container className='auth-container'>
                    <div>
                        <div className='auth-text'>
                            <h3 className='mb-1'>LOGIN TO ENG CLUB</h3>
                            <p className='text-muted'>enter the eng community at humberside</p>
                        </div>
                        <form className='auth' action='' onSubmit={this.handle_submit} >
                            <input onChange={this.handle_change} placeholder='email' name='email' type='email' required />
                            <div className='d-flex'>
                                <input onChange={this.handle_change} placeholder='password' name='password' type={this.state.show_pass ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <button type='submit' className='cta-btn-primary w-100 mat-btn outer-shadow'>Login</button>
                        </form>
                        <div className="strike my-3">
                            <span className='text-muted'>or sign in with google</span>
                        </div>
                        <div className='text-center'>
                            <GoogleLogin
                                clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
                                onSuccess={
                                    async (response) => {
                                        this.start_loading();
                                        await OauthLogin.oauth_login_from_response(response, this.context.add_account_info);
                                        this.stop_loading();
                                        history.push('/account');
                                    }}
                            />
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}

export default Login