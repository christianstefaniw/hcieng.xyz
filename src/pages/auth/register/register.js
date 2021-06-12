import { Component } from 'react'
import { Container } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopNav from '../../../components/nav/nav'

import '../auth.scss'


class Register extends Component {
    constructor() {
        super();
        this.state = {
            show_pass_first: false,
            show_pass_second: false
        }
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
                <TopNav loggedin={false} />
                <Container className='auth-container'>
                    <div>
                        <div className='auth-text'>
                            <h3 className='mb-1'>REGISTER FOR ENG CLUB</h3>
                            <p className='text-muted'>join the eng community at humberside</p>
                        </div>
                        <form className='auth' action='' >
                            <input placeholder='email' type='email' required />
                            <div className='d-flex'>
                                <input placeholder='password' type={this.state.show_pass_first ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_first_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <div className='d-flex'>
                                <input placeholder='re-enter password' type={this.state.show_pass_second ? 'text' : 'password'} required />
                                <i onClick={this.toggle_show_second_pass}><FontAwesomeIcon icon={faEye} /></i>
                            </div>
                            <button type='submit' className='cta-btn-primary w-100 mat-btn outer-shadow'>Login</button>
                        </form>
                        <div class="strike my-3">
                            <span className='text-muted'>or sign up with google</span>
                        </div>
                        <div className='text-center'>
                            <GoogleLogin
                                clientId="835439685490-8j1kg7tk53vhflhp5n9ifmrs164mmbom.apps.googleusercontent.com"
                                onSuccess={() => { }}
                                buttonText='Sign up with Google'
                                isSignedIn={true}
                            />
                        </div>

                    </div>
                </Container>
            </>
        )
    }
}

export default Register