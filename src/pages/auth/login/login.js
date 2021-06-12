import { Component } from 'react'
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopNav from '../../../components/nav/nav'
import oauth_login_from_response from '../../../services/login'
import LoggedinContext from '../../../providers/loggedin_provider'

import '../auth.scss'

class Login extends Component {
    static contextType = LoggedinContext;
    constructor() {
        super()
        this.state = {
            show_pass: false
        }
    }

    toggle_show_pass = () => {
        this.setState(prev_state => ({ show_pass: !prev_state.show_pass }))
    }

    render() {
        return (
            <>
                <TopNav />
                <Container className='auth-container'>
                    <div>
                        <div className='auth-text'>
                            <h3 className='mb-1'>LOGIN TO ENG CLUB</h3>
                            <p className='text-muted'>enter the eng community at humberside</p>
                        </div>
                        <form className='auth' action='' >
                            <input placeholder='email' type='email' required />
                            <div className='d-flex'>
                                <input placeholder='password' type={this.state.show_pass ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>

                            <button type='submit' className='cta-btn-primary w-100 mat-btn outer-shadow'>Login</button>
                        </form>
                        <div class="strike my-3">
                            <span className='text-muted'>or sign in with google</span>
                        </div>
                        <div className='text-center'>
                            <GoogleLogin
                                clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
                                onSuccess={(response) => oauth_login_from_response(response, this.context.toggle_loggedin)}
                                isSignedIn={true}
                            />
                        </div>

                    </div>
                </Container>
            </>
        )
    }
}

export default Login