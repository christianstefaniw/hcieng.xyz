import { Component } from 'react'
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopNav from '../../../components/nav/nav'
import { OauthRegister, register } from './services'
import history from '../../../history';
import AccountContext from '../../../providers/account_provider'

import '../auth.scss'


class Register extends Component {
    static contextType = AccountContext;

    constructor() {
        super();
        this.state = {
            show_pass_first: false,
            show_pass_second: false,
            email: "",
            password_1: "",
            password_2: "",
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
        let { email, password_1 } = this.state;
        this.start_loading();
        await register(email, password_1, this.context.add_account_info);
        this.stop_loading();
        history.push('/account');
    }

    toggle_show_first_pass = () => {
        this.setState(prev_state => ({ show_pass_first: !prev_state.show_pass_first }))
    }

    toggle_show_second_pass = () => {
        this.setState(prev_state => ({ show_pass_second: !prev_state.show_pass_second }))
    }

    render() {
        return (
            <>
                <TopNav />
                <Container className='auth-container'>
                    <div>
                        <div className='auth-text'>
                            <h3 className='mb-1'>REGISTER FOR ENG CLUB</h3>
                            <p className='text-muted'>join the eng community at humberside</p>
                        </div>
                        <form className='auth' action='' onSubmit={this.handle_submit} >
                            <input name='email' onChange={this.handle_change} placeholder='email' type='email' required />
                            <div className='d-flex'>
                                <input name='password_2' onChange={this.handle_change} placeholder='password' type={this.state.show_pass_first ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_first_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <div className='d-flex'>
                                <input name='password_2' onChange={this.handle_change} placeholder='re-enter password' type={this.state.show_pass_second ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_second_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <button type='submit' className='cta-btn-primary w-100 mat-btn outer-shadow'>Register</button>
                        </form>
                        <div className="strike my-3">
                            <span className='text-muted'>or sign up with google</span>
                        </div>
                        <div className='text-center'>
                            <GoogleLogin
                                clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
                                buttonText='Sign up With Google'
                                onSuccess={
                                    async (response) => {
                                        await OauthRegister.oauth_register_from_response(response, this.context.add_account_info);
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

export default Register